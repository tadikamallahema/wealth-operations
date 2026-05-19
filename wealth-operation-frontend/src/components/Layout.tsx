import SideBar from "./SideBar";
import Navbar from "./Navbar";

type Props = {
    children: React.ReactNode;
};

export default function Layout({
    children
}: Props) {

    return (

        <div className="flex min-h-screen bg-[#050816]">

            <SideBar />

            <div className="flex-1 flex flex-col">

                <Navbar />

                <div className="flex-1 p-6 overflow-auto">
                    {children}
                </div>

            </div>

        </div>
    );
}