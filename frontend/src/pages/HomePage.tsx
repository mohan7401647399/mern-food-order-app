import landingPage from '../assets/landing.png'
import appDownload from '../assets/appDownload.png'

export default function HomePage() {
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                    Tuck into a takeaway today
                </h1>
                <span className="text-xl">Food is just a click away!</span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingPage} alt="landingPage" />
                <div className='flex flex-col items-center justify-center gap-4 text-center p-1'>
                    <span className='font-bold text-3xl tracking-tighter'>
                        Order takeaway even faster!
                    </span>
                    <span>
                        Download the Fullstack eats App for faster ordering and personalised recommendations
                    </span>
                    <img src={appDownload} alt="appDownload" />
                </div>
            </div>
        </div>
    )
}