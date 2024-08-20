import { Route, Routes } from "react-router-dom"
import { Props } from "../interfaces/not-found.interface"

function RoutesWithNotFound({ children }: Props) {
    return (
        <Routes>

            {children}
            <Route path="*" element={
                <div className="text-7xl text-blue-950 text-center">Not Found</div>
                
                } />
            
        </Routes>
    )

}
export default RoutesWithNotFound