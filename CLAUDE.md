# base-auth-react (contexto para Claude Code)

## Qué es este proyecto

**No es una app real.** Es una **base/plantilla** de React + TypeScript + Vite
con autenticación, sesión y llamadas HTTP ya resueltas, pensada para
arrancar proyectos nuevos sin reescribir esa parte cada vez. Cuando alguien
pida "creá un proyecto nuevo a partir de esto" o similar, el flujo es: copiar
esta carpeta, cambiar `.env`, y reemplazar las páginas/el menú de ejemplo —
no tocar la arquitectura de auth/HTTP salvo que se pida explícitamente.

Este proyecto vive al lado de `siscofar-frontend` (`../siscofar-frontend`),
un sistema hospitalario real construido por el mismo usuario. Varias
convenciones de acá vienen de ahí (mismo alias `@/`, mismo patrón de
interceptor axios, mismo estilo de `getErrorMessage`), pero **acá no hay
dominio de negocio** — todo lo de `pages/Private/Admin`, `User`, `Guest`,
el menú de `DropdownMenu.tsx`, etc. es contenido de ejemplo/demo, no algo a
mantener con cuidado.

## Historia reciente (por qué está como está)

El repo arrancó como un clon/experimento (`<title>TESTEO</title>` original,
sin `node_modules` instalado nunca, **nunca se había corrido un build real**
hasta la limpieza descripta abajo). Tenía bastante código pegado de
siscofar-frontend a medio adaptar. Se hizo una limpieza completa en una
sesión (ver git log) que:

1. Agregó el alias `@/` (`vite.config.ts` + `tsconfig.app.json`).
2. Reemplazó un interceptor de axios que no hacía nada (`src/interceptors/`,
   **ya no existe**) por una instancia real con manejo de token/errores
   (`src/api/axios.ts`).
3. Agregó manejo centralizado de errores (`getErrorMessage`) y alertas
   (`alert.utils.ts`, `session-alerts.utils.ts`, SweetAlert2 — se agregó
   como dependencia nueva).
4. Arregló la seguridad de sesión: validación de expiración del JWT al
   hidratar el store (antes no existía, el "usuario viejo" podía quedar
   logueado con un token vencido), guard de auth simplificado, `RoleGuard`
   pasado de un solo rol a `roles: Roles[]`.
5. Limpieza general: borró imports/exports colgantes que apuntaban a
   archivos inexistentes (`IngresoProductos`, `Admin/Profile.tsx` duplicado
   — el proyecto nunca se había buildeado, así que nadie lo había notado),
   sacó una ruta (`INGRESO_PRODUCTOS`) y una imagen (`bgfarma.jpg`) que eran
   residuo de siscofar, migró `.eslintrc.cjs` (formato viejo) a
   `eslint.config.js` (flat config, lo que pide ESLint 9).

Point de partida: **`npx tsc -b --noEmit`, `npm run lint` y
`npx vite build` corren limpios.** Si alguno de los tres falla al arrancar
una sesión nueva, algo se rompió después de esto — no es el estado normal.

## Arquitectura (esto sí hay que mantener con cuidado)

### Alias `@/`
Apunta a `src/` (`vite.config.ts` → `resolve.alias`, `tsconfig.app.json` →
`compilerOptions.paths`). Usarlo para cualquier import que cruce de un
módulo a otro (`@/models`, `@/services`, `@/utilities`, `@/interfaces`,
`@/redux/store`). Dentro de un mismo módulo (ej. entre dos componentes de
`src/components/`), una ruta relativa corta (`../Logout/Logout`) está bien
— no forzar el alias ahí.

### Cliente HTTP centralizado — `src/api/axios.ts`
Instancia única `api` (axios) que **todos** los services deben usar en vez
de `axios` importado directo:
- Interceptor de **request**: agrega `Authorization: Bearer <token>` leyendo
  el usuario de `localStorage` (`UserKey`, en `redux/states/user.ts`). Por
  esto **los services no reciben `token` como parámetro** — si ves un
  service pidiendo `token`, es código viejo sin migrar.
- Interceptor de **response**:
  - `401` → limpia `localStorage` y redirige a `/login`.
  - Sin respuesta del servidor (caído / sin red / `ERR_CONNECTION_REFUSED`)
    → limpia sesión, muestra `servidorNoDisponibleAlert()` y redirige a
    `/login`. Usa una bandera de módulo (`avisandoServidorCaido`) para no
    disparar la alerta varias veces si hay varios requests en paralelo
    fallando a la vez.
  - Cualquier otro error se normaliza a `new Error(mensaje)` (tomado de
    `error.response?.data?.message`), así el `catch` del consumidor nunca
    necesita leer `error.response.data.message` a mano.

### Errores y alertas
- `src/utilities/errors/getErrorMessage.utility.ts` → `getErrorMessage(error)`.
  Usar en **todo** `catch`, en vez de `error.message`/`error?.message` a mano.
- `src/utilities/alerts/alert.utils.ts` → `showSuccess(title, text?)` /
  `showError(text, title?)`, wrappers de SweetAlert2. Si un proyecto nuevo
  necesita alertas de negocio propias (mensajes específicos repetidos),
  agregarlas en un archivo nuevo (ej. `<proyecto>-alerts.utils.ts`), sin
  tocar `session-alerts.utils.ts` (esa es solo del interceptor).

### Sesión y seguridad de páginas
- `src/redux/states/user.ts`: `getInitialUserState()` valida, al hidratar
  el store desde `localStorage`, que el JWT no esté vencido (lo decodifica
  con `jwt-decode`). Si expiró o el storage está corrupto, arranca en
  `EmptyUserState` en vez de dejar una sesión "logueada" que no puede pedir
  nada real. **Esta es la única validación de expiración que debe existir**
  — no duplicarla en un guard o en un `useEffect` de cada página.
- `src/guards/auth.guard.tsx` (`AuthGuard`): decide si hay o no usuario
  logueado (`!!userState.token`). No revalida expiración (ya la hizo
  `getInitialUserState`) ni hace polling — para eso está el interceptor,
  que cierra sesión ante cualquier 401 en cualquier momento.
- `src/guards/rol.guard.tsx` (`RoleGuard`): recibe `roles: Roles[]` (no un
  solo `role`), para poder proteger una ruta que permite más de un rol:
  `<RoleGuard roles={[Roles.ADMIN, Roles.USER]} />`.
- `src/components/Header.tsx`: el menú privado (`DropdownMenu`) solo se
  muestra si hay token **y** la ruta actual no es pública. Si solo se
  chequea el token, un token viejo en `localStorage` hace que el menú
  aparezca un instante sobre la pantalla de login al recargar — bug real
  que ya se vio en siscofar-frontend, cuidado con reintroducirlo.

### Interfaces
`src/interfaces/index.ts` es un barrel — **los nombres de las interfaces
tienen que ser únicos entre archivos** (`GuardProps`, `RoleProps`,
`NotFoundProps`, no `Props` genérico repetido), porque un `export *`
duplicado no compila. Si se agrega una interfaz nueva de props, no llamarla
`Props` a secas.

## Convenciones de trabajo (heredadas de cómo trabaja este usuario)

- **Cambio mínimo necesario.** No proponer reescrituras grandes ni cambiar
  de librería/arquitectura sin que se pida explícitamente.
- Analizar antes de tocar, aplicar el cambio, **compilar y buildear
  después de cada modificación importante** (`npx tsc -b --noEmit` +
  `npx vite build`, y `npm run lint` si el cambio toca algo que el linter
  pueda opinar). No dar algo por terminado sin correr los tres.
- Nunca eliminar algo (`service`, `hook`, `componente`, export) solo porque
  "parece" no usarse — buscar referencias primero. (Así se encontraron los
  exports colgantes a `IngresoProductos`/`Admin/Profile.tsx`: nadie los
  había buscado, y tampoco nadie había buildeado el proyecto para que
  fallaran solos.)
- Entregar el código completo del archivo tocado, no fragmentos sueltos.
- Este proyecto **no tiene dominio de negocio propio** — a diferencia de
  siscofar-frontend, no hay que preservar nombres de campos, textos ni
  reglas de negocio de terceros. Lo que sí hay que preservar es la
  arquitectura de la sección anterior.

## Al arrancar un proyecto real a partir de esta base

1. Cambiar `VITE_API_BASE_URL` en `.env`.
2. Ajustar a la forma real del backend nuevo:
   - `src/interfaces/decode.token.interface.ts` (payload del JWT)
   - `src/models/user.model.ts` (`UserInfo`)
   - `src/interfaces/users.interface.ts` (`User`, lo que devuelve `/auth/profile`)
   - `src/services/auth.service.ts`, `profile.service.ts`, `register.service.ts`
     (rutas y forma de la respuesta del backend)
3. `src/models/roles.enum.ts` y `src/models/routes.ts`: reemplazar los
   roles/rutas de ejemplo (`ADMIN`/`USER`/`GUEST`) por los reales del
   proyecto nuevo.
4. Reemplazar las páginas de ejemplo (`pages/Private/Admin`, `User`,
   `Guest`, `Profile.tsx`) y el menú (`components/NavBars/DropdownMenu.tsx`,
   que todavía tiene links placeholder tipo `/admin/1`, `/link3`) por las
   páginas reales.
5. No hace falta tocar `src/api/axios.ts`, los guards, ni
   `redux/states/user.ts` salvo que el backend nuevo tenga un contrato de
   auth realmente distinto (ej. refresh tokens, cookies en vez de
   `Authorization` header).

## Estructura

```
src/
├─ api/axios.ts                        (instancia axios + interceptors — no tocar sin razón)
├─ components/
│  ├─ Header.tsx                       (chequea token + ruta pública)
│  ├─ Logout/Logout.tsx                (hook useLogout)
│  └─ NavBars/DropdownMenu.tsx         (menú — CONTENIDO DE EJEMPLO)
├─ guards/                             (AuthGuard, RoleGuard)
├─ interfaces/                         (barrel: @/interfaces — nombres únicos)
├─ models/                             (Roles, PublicRoutes/PrivateRoutes, UserInfo)
├─ pages/
│  ├─ Login/, Register/                (formularios básicos, sin estilar)
│  └─ Private/Admin|User|Guest/        (CONTENIDO DE EJEMPLO, reemplazar)
├─ redux/
│  ├─ states/user.ts                   (sesión: createUser/updateUser/resetUser + getInitialUserState)
│  └─ store.ts
├─ services/                           (auth, profile, register — todos vía `api`, sin `token` param)
└─ utilities/
   ├─ apiUrl.utility.ts
   ├─ errors/getErrorMessage.utility.ts
   └─ alerts/ (alert.utils.ts, session-alerts.utils.ts)
```

## Estado de las herramientas

- `npm run dev` — Vite dev server.
- `npm run build` — `tsc -b && vite build`. Limpio a la fecha de este archivo.
- `npm run lint` — ESLint 9, flat config (`eslint.config.js`). Limpio a la
  fecha de este archivo.
- Sin tests configurados (no hay Jest/Vitest/Playwright instalado).
