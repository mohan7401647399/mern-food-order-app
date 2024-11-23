import { Link } from 'react-router-dom'
import MobileNav from './MobileNav'
import MainNav from './MainNav'

export default function Header() {
    return (
        <div className='border-b-2 border-b-orange-500 p-5'>
            <div className='container mx-auto flex justify-between items-center'>
                <Link to='/' className='text-3xl font-bold tracking-tight text-orange-500'>
                    Fullstack_eats.com
                </Link>
                <div className='md:hidden'>
                    <MobileNav />
                </div>
                <div className='hidden md:block'>
                    <MainNav />
                </div>
            </div>
        </div>
    )
}
