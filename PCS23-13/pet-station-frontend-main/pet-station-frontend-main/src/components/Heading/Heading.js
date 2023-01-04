// importing components
import { Typography } from '@mui/material';

// Profile Heading component
export default function Heading(props) {
    // deconstructing props
    const { sticker, heading, children, subheading } = props;

    return (
        <div className="profileHeading flex items-center">
            <div className="profileHeading-image">
                <img
                    height={100}
                    width={100}
                    src={sticker}
                    alt="heading"
                />
            </div>

            <div className="profileHeading-content mx-5">
                <div className="profileHeading-content-header mb-4">
                    <Typography
                        variant='h4'
                        className="profileHeading-content-header-heading mb-2"
                    >
                        {
                            heading
                        }
                    </Typography>

                    <Typography
                        className="profileHeading-content-header-subheading text-md"
                    >
                        {
                            subheading
                        }
                    </Typography>
                </div>
                {
                    children
                }
            </div>
        </div>
    );
}