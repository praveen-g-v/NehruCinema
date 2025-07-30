import { useState } from "react";
import {
  FaChartBar,
  FaFilm,
  FaTicketAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBullhorn,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const [showCreateScreeningModal, setShowCreateScreeningModal] =
    useState(false);
  const [showNewPromotionModal, setShowNewPromotionModal] = useState(false);
  const [showManageStaffModal, setShowManageStaffModal] = useState(false);

  // Mock data
  const stats = [
    {
      name: "Today Revenue",
      value: "$2,450",
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "Total Bookings",
      value: "143",
      change: "+5%",
      changeType: "positive",
    },
    {
      name: "Movies Screening",
      value: "8",
      change: "-2",
      changeType: "negative",
    },
    {
      name: "Occupancy Rate",
      value: "68%",
      change: "+3%",
      changeType: "positive",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      movie: "Dune: Part Two",
      time: "7:30 PM",
      seats: "A5, A6",
      amount: "$28",
    },
    {
      id: 2,
      movie: "The Batman",
      time: "4:15 PM",
      seats: "B2, B3",
      amount: "$24",
    },
    {
      id: 3,
      movie: "Oppenheimer",
      time: "9:45 PM",
      seats: "C7",
      amount: "$14",
    },
  ];

  const upcomingMovies = [
    { id: 1, title: "Furiosa", release: "May 24", status: "Coming Soon" },
    { id: 2, title: "Deadpool 3", release: "Jul 26", status: "Coming Soon" },
    {
      id: 3,
      title: "Joker: Folie à Deux",
      release: "Oct 4",
      status: "Preparing",
    },
  ];

  // Quick Action handlers
  const handleAddMovie = () => {
    setShowAddMovieModal(true);
    console.log("Add Movie clicked");
    // In a real app, you would open a modal or navigate to a form
  };

  const handleCreateScreening = () => {
    setShowCreateScreeningModal(true);
    console.log("Create Screening clicked");
  };

  const handleNewPromotion = () => {
    setShowNewPromotionModal(true);
    console.log("New Promotion clicked");
  };

  const handleManageStaff = () => {
    setShowManageStaffModal(true);
    console.log("Manage Staff clicked");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-20 ${
          sidebarOpen ? "w-64" : "w-0 md:w-20"
        } bg-indigo-800 text-white transition-all duration-300 h-full`}
      >
        <div className="p-4 flex items-center justify-between md:justify-center h-16 border-b border-indigo-700">
          {sidebarOpen && <h1 className="text-xl font-bold">CineAdmin</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {sidebarOpen ? (
              <FaTimes className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="mt-6">
          <NavItem
            icon={<FaChartBar className="h-5 w-5" />}
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            expanded={sidebarOpen}
          >
            Dashboard
          </NavItem>
          <NavItem
            icon={<FaFilm className="h-5 w-5" />}
            active={activeTab === "movies"}
            onClick={() => setActiveTab("movies")}
            expanded={sidebarOpen}
          >
            Movies
          </NavItem>
          <NavItem
            icon={<FaTicketAlt className="h-5 w-5" />}
            active={activeTab === "screenings"}
            onClick={() => setActiveTab("screenings")}
            expanded={sidebarOpen}
          >
            Screenings
          </NavItem>
          <NavItem
            icon={<FaUsers className="h-5 w-5" />}
            active={activeTab === "customers"}
            onClick={() => setActiveTab("customers")}
            expanded={sidebarOpen}
          >
            Customers
          </NavItem>
          <NavItem
            icon={<FaMoneyBillWave className="h-5 w-5" />}
            active={activeTab === "reports"}
            onClick={() => setActiveTab("reports")}
            expanded={sidebarOpen}
          >
            Reports
          </NavItem>
          <NavItem
            icon={<FaBullhorn className="h-5 w-5" />}
            active={activeTab === "promotions"}
            onClick={() => setActiveTab("promotions")}
            expanded={sidebarOpen}
          >
            Promotions
          </NavItem>
          <NavItem
            icon={<FaCog className="h-5 w-5" />}
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
            expanded={sidebarOpen}
          >
            Settings
          </NavItem>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button className="flex items-center space-x-3 text-white hover:text-gray-200 w-full">
            <FaSignOutAlt className="h-5 w-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            Dashboard Overview
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
              AM
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.name}
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      stat.changeType === "positive"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bookings */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Bookings
                </h3>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {booking.movie}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {booking.time} • {booking.seats}
                      </p>
                    </div>
                    <span className="font-semibold">{booking.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Movies */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Upcoming Movies
                </h3>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Add new
                </button>
              </div>
              <div className="space-y-4">
                {upcomingMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex-shrink-0 h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <FaFilm className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {movie.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500 flex items-center">
                          <FaCalendarAlt className="h-3 w-3 mr-1" />
                          {movie.release}
                        </span>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {movie.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction
              icon={<FaFilm className="h-5 w-5" />}
              title="Add Movie"
              onClick={handleAddMovie}
            />
            <QuickAction
              icon={<FaTicketAlt className="h-5 w-5" />}
              title="Create Screening"
              onClick={handleCreateScreening}
            />
            <QuickAction
              icon={<FaBullhorn className="h-5 w-5" />}
              title="New Promotion"
              onClick={handleNewPromotion}
            />
            <QuickAction
              icon={<FaUsers className="h-5 w-5" />}
              title="Manage Staff"
              onClick={handleManageStaff}
            />
          </div>

          {/* Modal Placeholders - These would be implemented as proper modals */}
          {showAddMovieModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">Add New Movie</h3>
                {/* Form would go here */}
                <button
                  onClick={() => setShowAddMovieModal(false)}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, children, active, onClick, expanded }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 w-full px-6 py-3 text-left transition-colors ${
        active
          ? "bg-indigo-700 text-white"
          : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
      }`}
    >
      <span>{icon}</span>
      {expanded && <span>{children}</span>}
    </button>
  );
};

const QuickAction = ({ icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center space-y-2 hover:bg-indigo-50 transition-colors"
    >
      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </button>
  );
};

export default AdminDashboard;
