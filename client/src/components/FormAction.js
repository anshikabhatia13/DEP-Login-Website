import { useNavigate } from 'react-router-dom';
import './FormAction.css'; 
export default function FormAction({
    type = 'Button',
    action = 'submit',
    text,
    to // new prop to specify the target page
}) {
    const navigate = useNavigate();

    const handleClick = () => {
        // Check if a custom "to" prop is provided
        if (to) {
            navigate(to); // Navigate to the specified page
        } else {
            console.warn('No "to" prop provided for navigation.');
        }
    };

    return (
        <>
            {type === 'Button' ? (
                <div className="flex items-center justify-center h-full">
                    <button
                        type={action}
                        className="button"
                        onClick={handleClick}
                    >
                        {text}
                    </button>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
