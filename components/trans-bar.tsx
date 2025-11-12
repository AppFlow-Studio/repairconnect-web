export default function TransBar() {
    return (
        <div className="w-full bg-transparent space-y-[2px]">
            {/* Warm neutral to white gradient lines */}
            <div className="w-full h-[8px]" style={{ background: 'rgb(151, 121, 105)' }}></div>
            <div className="w-full h-[6px]" style={{ background: 'rgb(182, 161, 150)' }}></div>
            <div className="w-full h-[6px]" style={{ background: 'rgb(198, 181, 173)' }}></div>
            <div className="w-full h-[6px]" style={{ background: 'rgb(213, 201, 195)' }}></div>
            <div className="w-full h-[6px]" style={{ background: 'rgb(229, 222, 217)' }}></div>
            <div className="w-full h-[6px]" style={{ background: 'rgb(239, 234, 232)' }}></div>
            <div className="w-full h-[6px]" style={{ background: 'rgb(247, 244, 243)' }}></div>
            <div className="w-full h-[4px]" style={{ background: 'rgb(252, 251, 251)' }}></div>
            <div className="w-full h-[2px]" style={{ background: 'rgb(255, 255, 255)' }}></div>
        </div>
    )
}

export function TransBarTwo() {
    return (
        <div className="w-full bg-transparent space-y-[2px]">
            {/* White to bg-gray-50/80 gradient lines - subtle transition */}
            <div className="w-full h-[8px]" style={{ background: 'rgb(255, 255, 255)' }}></div>
            <div className="w-full h-[6px]" style={{ background: 'rgb(254, 254, 254)' }}></div>
            <div className="w-full h-[6px]" style={{ background: 'rgb(253, 253, 253)' }}></div>
            <div className="w-full h-[6px]" style={{ background: 'rgb(252, 252, 252)' }}></div>
            <div className="w-full h-[6px]" style={{ background: 'rgb(251, 251, 251)' }}></div>
            <div className="w-full h-[6px]" style={{ background: 'rgb(250, 250, 250)' }}></div>
            <div className="w-full h-[6px]" style={{ background: 'rgb(249, 250, 251)' }}></div>
            <div className="w-full h-[4px]" style={{ background: 'rgba(249, 250, 251, 0.8)' }}></div>
            {/* <div className="w-full h-[2px]" style={{ background: '#051937' }}></div> */}
        </div>
    )
}



