export default function FormAction({
    handleSubmit,
    type = 'Button',
    action = 'submit',
    text
}) {
    return (
        <>
            {type === 'Button' ? (
                <div className="flex items-center justify-center h-full">
                    <button
                        type={action}
                        className="button"
                        onClick={handleSubmit}
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
