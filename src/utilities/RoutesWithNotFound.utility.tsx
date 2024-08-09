import { Route, Routes } from "react-router-dom"
import { Props } from "../interfaces/not-found.interface"

function RoutesWithNotFound({ children }: Props) {
    return (
        <Routes>

            {children}
            <Route path="*" element={<div>Not Found</div>} />
            
        </Routes>
    )

}
export default RoutesWithNotFound