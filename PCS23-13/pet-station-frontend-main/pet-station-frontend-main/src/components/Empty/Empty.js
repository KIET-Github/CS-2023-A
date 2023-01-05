import { Typography } from "@mui/material";

// Empty function
export default function Empty(props) {
    const { image, label } = props;

    return (
        <div className="empty flex items-center justify-center">
            <div
                className='flex flex-col md:flex-row items-center justify-around shadow-1 rounded-lg md:w-4/5'
            >
                <div className="empty-illustration">
                    <img
                        height={250}
                        width={250}
                        src={image}
                        alt="sticker"
                    />
                </div>

                <Typography
                    className="empty-label text-center md:text-left p-5 md:w-1/2"
                    variant="h6"
                >
                    {
                        label
                    }
                </Typography>
            </div>
        </div>
    )
}