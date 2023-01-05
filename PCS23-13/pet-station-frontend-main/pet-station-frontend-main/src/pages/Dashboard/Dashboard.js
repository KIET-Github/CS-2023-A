// importing components
import { useContext, useState } from "react";
import { useQuery } from "react-query";

// importing custom components
import Sidebar from "../../components/Sidebar/Sidebar";
import Board from "../../components/Board/Board";
import { FullScreenLoading } from '../../components/Loading/Loading';

// importing context
import AuthContext from '../../context/auth';

// import utility handler
import { fetchUserData } from "../../utilities/helper";

// Dashboard component
export default function DashboardPage() {
    // auth context
    const authCtx = useContext(AuthContext);

    // states
    const [option, setOption] = useState('profile');

    // fetch user information
    const { isLoading, error, data } = useQuery('user', () => fetchUserData(authCtx.token));

    if (isLoading)
        return <FullScreenLoading />

    if (error)
        return <div>Normal Error</div>

    if (data.response !== undefined && (data.response.data.status === 'fail' || data.response.data.status === 'error'))
        return <div>Error</div>

    return (
        <div className='dashboardPage peach-color min-h-screen'>
            <div className='dashboard-sidebar'>
                <Sidebar
                    user={data.data.data}
                    authCtx={authCtx}
                    option={option}
                    setOption={setOption}
                />
            </div>

            <div className='dashboard-board'>
                <Board
                    user={data.data.data}
                    authCtx={authCtx}
                    option={option}
                />
            </div>
        </div>
    )
}