import logo from '../../assets/logo.png';

export default function Header() {
    return (
        <nav className="bg-caput-mortuum shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                        <img className="h-14 w-auto object-contain" src={logo} alt="PetalPost Logo" />
                    </div>
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8 h-full">
                        <a href="#" className="text-white hover:opacity-80 flex items-center h-full px-3 py-2 border-b-2 border-transparent" style={{ ':hover': { color: 'rgb(var(--color-flax))', borderColor: 'rgb(var(--color-flax))' } }}>Home</a>
                        <a href="#" className="text-white hover:opacity-80 flex items-center h-full px-3 py-2 border-b-2 border-transparent" style={{ ':hover': { color: 'rgb(var(--color-flax))', borderColor: 'rgb(var(--color-flax))' } }}>Shop</a>
                        <a href="#" className="text-white hover:opacity-80 flex items-center h-full px-3 py-2 border-b-2 border-transparent" style={{ ':hover': { color: 'rgb(var(--color-flax))', borderColor: 'rgb(var(--color-flax))' } }}>Arrangements</a>
                        <a href="#" className="text-white hover:opacity-80 flex items-center h-full px-3 py-2 border-b-2 border-transparent" style={{ ':hover': { color: 'rgb(var(--color-flax))', borderColor: 'rgb(var(--color-flax))' } }}>Contact</a>
                    </div>
                    </div>
                    <div className="flex items-center">
                    <button className="text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200" style={{ backgroundColor: 'rgb(var(--color-wine))', ':hover': { backgroundColor: 'rgb(var(--color-redwood))' } }}>Sign In</button>
                    <button className="ml-4 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center" style={{ backgroundColor: 'rgb(var(--color-redwood))', ':hover': { backgroundColor: 'rgb(var(--color-wine))' } }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Cart (0)
                    </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}   