import PuffLoader from 'react-spinners/PuffLoader';

export default function () {
    return (
        <div className="grid bg-black place-content-center">
            <div className="grid grid-cols-[1fr_auto] tracking-wider text-[#808080] font-medium font-inter text-4xl">
                <div className="grid">
                    <PuffLoader size={150} color="gray" />
                </div>
            </div>
        </div>
    )
}