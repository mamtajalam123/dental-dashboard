import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import MobileMenu from "../components/layout/MobileMenu";


export default function DashboardLayout({

  children,

}: {

  children: React.ReactNode;

}) {


  return (

    <div className="flex min-h-screen bg-[#f8fafc]">


      {/* Mobile Menu */}

      <MobileMenu />



      {/* Desktop Sidebar */}

      <Sidebar />





      {/* Main Content */}

<div className="flex min-h-screen flex-1 flex-col lg:ml-[270px]">





        {/* Header */}

        <Header />





        {/* Page Content */}

        <main className="flex-1 overflow-y-auto p-15 pt-20 lg:pt-6">

          {children}

        </main>





        {/* Footer */}

        <Footer />



      </div>



    </div>

  );

}