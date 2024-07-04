import React, {useEffect} from 'react';
import {Slider} from "antd";

function getGradientColor(percentage) {
    const startColor = [120, 255, 0];
    const endColor = [255, 80, 0];

    const midColor = startColor.map((start, i) => {
        const end = endColor[i];
        const delta = end - start;
        return (start + delta * percentage).toFixed(0);
    });

    return `rgb(${midColor.join(',')})`;
}

const SliderProgress = ({cord}) => {
    const [value, setValue] = React.useState([0, 50, 100]);

    useEffect(() => {
        setValue([0, cord, 100])
        console.log(cord)
    }, [cord])

    const onChange = (newValue) => {
        setValue(newValue);
    };
    const start = 0 / 100;
    const end = 100 / 100;
    return (
        <div>
            <Slider
                range
                value={value}
                onChange={onChange}
                styles={{
                    track: {
                        background: 'transparent',
                    },
                    tracks: {
                        background: `linear-gradient(to right, ${getGradientColor(start)} 0%, ${getGradientColor(
                            end,
                        )} 100%)`,
                    },
                }}
            />
        </div>
    );
};

export default SliderProgress;