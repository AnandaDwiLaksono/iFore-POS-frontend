import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import { Navbar, Sidebar, ThemeSettings} from './components';
import { useStateContext } from './contexts/ContextProvider';
import { Calendar, Dashboard, Inventory, Kanban, Transaction, TransactionHistory, Profile, InventoryHistory } from './pages';

function App() {
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();
  const path = window.location.pathname;
  const showNavbarAndSidebar = !(path === '/auth/register' || path === '/auth/login');

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg bg-main-bg'>
          {showNavbarAndSidebar && (
            <div className='fixed right-4 bottom-4' style={{ zIndex: '1000' }}>
              <TooltipComponent content='Theme Settings' position='TopCenter'>
                <button
                  type='button'
                  className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white' 
                  style={{ background: currentColor, borderRadius: '50%' }}
                  onClick={() => setThemeSettings(true)}
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
          )}

          {showNavbarAndSidebar && (
            <div className={activeMenu ? 'w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white m-4 rounded-lg' : 'w-0 dark:bg-secondary-dark-bg'}>
              <Sidebar />
            </div>
          )}
          
          <div className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${showNavbarAndSidebar ? (activeMenu ? 'md:ml-72' : 'flex-2') : ''}`}>
            {showNavbarAndSidebar && (
              <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                <Navbar />
              </div>
            )}

            <div className='mt-[60px] md:mt-0'>
              {themeSettings && <ThemeSettings />}

              <Routes>
                {/* Authentication */}
                {/* <Route path='/auth/register' element={<SignUp />} />
                <Route path='/auth/login' element={<SignIn />} /> */}

                {/* Dashboard */}
                <Route path='/' element={<Dashboard />} />
                <Route path='/dashboard' element={<Dashboard />} />

                {/* Pages */}
                <Route path='/inventory' element={<Inventory />} />
                <Route path='/transaction history' element={<TransactionHistory />} />
                <Route path='/transaction' element={<Transaction />} />
                <Route path='/inventory history' element={<InventoryHistory />} />

                {/* Apps */}
                <Route path='/calendar' element={<Calendar />} />
                <Route path='/kanban' element={<Kanban />} />

                {/* Profile */}
                <Route path='/profile' element={<Profile />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={currentMode === 'Dark' ? 'dark' : 'light'}
        transition={Slide}
      />
    </div>
  );
}

export default App;
