import { useState, useEffect } from "react";


interface ICountdownTimerProps {
    date: Date
    title: string
}
const CountdownTimer = (
    props: ICountdownTimerProps

) => {




    const calculateTimeLeft = () => {
        const now = new Date();
        const nextBirthday = new Date(props.date); 
        const difference = nextBirthday.getTime() - now.getTime();

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (


        <>

            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
                {props.title}
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div
                        key={unit}
                        className="flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow-lg w-24 sm:w-32"
                    >
                        <span className="text-4xl sm:text-5xl font-mono font-bold">
                            {value}
                        </span>
                        <span className="text-sm sm:text-base uppercase tracking-wide opacity-75">
                            {unit}
                        </span>
                    </div>
                ))}

            </div>

        </>


    );
};

export default CountdownTimer;
