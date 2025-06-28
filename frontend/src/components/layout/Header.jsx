import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useLogout, useUser } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

export default function Header() {
    // Get user data from React Query
    const { data: user, isSuccess: isAuthenticated } = useUser();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const logoutMutation = useLogout();
    const dropdownRef = useRef(null);
    const { data: cartData } = useCart();
    
    // Extract first name if user exists
    const firstName = user?.data.first_name ? user.data.first_name.split(' ')[0] : null;
    
    // Toggle dropdown menu
    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };
    
    // Handle logout
    const handleLogout = () => {
        logoutMutation.mutate();
        setDropdownOpen(false);
    };
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        
        // Add event listener when dropdown is open
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);
    return (
        <nav className="bg-caput-mortuum shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                        <img className="h-14 w-auto object-contain" src={logo} alt="PetalPost Logo" />
                    </div>
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8 h-full">
                        <Link to="/" className="text-white hover:opacity-80 flex items-center h-full px-3 py-2 border-b-2 border-transparent" style={{ ':hover': { color: 'rgb(var(--color-flax))', borderColor: 'rgb(var(--color-flax))' } }}>Home</Link>
                        <Link to="/shop" className="text-white hover:opacity-80 flex items-center h-full px-3 py-2 border-b-2 border-transparent" style={{ ':hover': { color: 'rgb(var(--color-flax))', borderColor: 'rgb(var(--color-flax))' } }}>Shop</Link>
                        <Link to="/arrangements" className="text-white hover:opacity-80 flex items-center h-full px-3 py-2 border-b-2 border-transparent" style={{ ':hover': { color: 'rgb(var(--color-flax))', borderColor: 'rgb(var(--color-flax))' } }}>Arrangements</Link>
                        <Link to="/contact" className="text-white hover:opacity-80 flex items-center h-full px-3 py-2 border-b-2 border-transparent" style={{ ':hover': { color: 'rgb(var(--color-flax))', borderColor: 'rgb(var(--color-flax))' } }}>Contact</Link>
                    </div>
                    </div>
                    <div className="flex items-center">
                    <Link to="/cart" className="mr-4 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center" style={{ backgroundColor: 'rgb(var(--color-redwood))', ':hover': { backgroundColor: 'rgb(var(--color-wine))' } }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Cart ({cartData?.meta.total_items || 0})
                    </Link>
                    {isAuthenticated ? (
                        <div className="relative" ref={dropdownRef}>
                            <button 
                                onClick={toggleDropdown}
                                className="text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors duration-200 cursor-pointer focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                <span>{firstName || 'Account'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {/* Dropdown menu */}
                            {dropdownOpen && (
                                <div 
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                                >
                                    <div className="px-4 py-2 text-sm text-caput-mortuum border-b border-gray-200">
                                        Signed in as<br/>
                                        <span className="font-semibold">{user?.email}</span>
                                    </div>
                                    <Link 
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-caput-mortuum hover:bg-flax hover:text-caput-mortuum"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                            My Profile
                                        </div>
                                    </Link>
                                    <Link 
                                        to="/orders"
                                        className="block px-4 py-2 text-sm text-caput-mortuum hover:bg-flax hover:text-caput-mortuum"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5z" clipRule="evenodd" />
                                                <path d="M7 7h6v2H7V7zm0 4h3v2H7v-2z" />
                                            </svg>
                                            My Orders
                                        </div>
                                    </Link>
                                    <Link 
                                        to="/favorites"
                                        className="block px-4 py-2 text-sm text-caput-mortuum hover:bg-flax hover:text-caput-mortuum"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                            My Favorites
                                        </div>
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left block px-4 py-2 text-sm text-caput-mortuum hover:bg-flax hover:text-caput-mortuum"
                                    >
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                            </svg>
                                            Log out
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200" 
                                style={{ backgroundColor: 'rgb(var(--color-wine))', ':hover': { backgroundColor: 'rgb(var(--color-redwood))' } }}>
                                Sign In
                            </button>
                        </Link>
                    )}
                    </div>
                </div>
            </div>
        </nav>
    );
}   