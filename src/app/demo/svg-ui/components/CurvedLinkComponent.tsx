import * as d3 from "d3";
import {calculateRotationAngle} from "@/app/demo/svg-ui/utils/calculateRotationAngle";
import React from "react";
import {Coordinate} from "@/app/demo/svg-ui/components/LinkComponent";
import {useSineLutContext} from "@/graph-tools/contexts/animationSyncContextCreator";
import {LinkGraphicsElementProps} from "@/app/demo/svg-ui/context/linkComponentContextCreator";


const Emerald = 'hsla(160, 84%, 39%, 1)'

export default function CurvedLinkComponent({
                                                sourceNodeLocation: {x: x1, y: y1},
                                                targetNodeLocation: {x: x2, y: y2},
                                                showEdgesFromChildren,
                                                showEdgesFromParents,
                                                sourceSelected,
                                                targetSelected,
                                                showArrowsToChildren,
                                                showArrowsToParents
                                            }: LinkGraphicsElementProps<any, SVGGElement>) {

    const sineLutSync = Math.abs(useSineLutContext(Date.now() / 10));

    const lineGenerator = d3
        .line(
            (d: Coordinate) => d.x,
            (d: Coordinate) => d.y
        )
        .curve(d3.curveBasis);
    const locationInterpolation = d3.interpolateObject(
        {x: x1, y: y1},
        {x: x2, y: y2}
    );

    const firstQuart = {...locationInterpolation(0.25)};
    const midPoint = {...locationInterpolation(0.5)};
    const lastQuart = {...locationInterpolation(0.75)};

    const data: Coordinate[] = [
        {x: x1, y: y1},
        {x: firstQuart.x, y: y1},
        {x: midPoint.x, y: midPoint.y},
        {x: lastQuart.x, y: y2},
        {x: x2, y: y2}
    ];

    const curvePathData = lineGenerator(data);

    const interpolateArrowPositionX = d3.interpolateBasis(data.map((d) => d.x));
    const interpolateArrowPositionY = d3.interpolateBasis(data.map((d) => d.y));

    const arrowToParentLocation = {
        x: interpolateArrowPositionX(0.67 + 0.15 * sineLutSync),
        y: interpolateArrowPositionY(0.67 + 0.15 * sineLutSync)
    };
    const arrowToChildLocation = {
        x: interpolateArrowPositionX(0.33 - 0.15 * sineLutSync),
        y: interpolateArrowPositionY(0.33 - 0.15 * sineLutSync)
    };

    const parentRotationAngle = calculateRotationAngle(
        x1,
        y1,
        arrowToParentLocation.x,
        arrowToParentLocation.y
    );
    const childRotationAngle = (parentRotationAngle + 180) % 360;

    const glow =
        (showEdgesFromChildren && sourceSelected) ||
        (showEdgesFromParents && targetSelected);

    const emeraldGlow = d3.color(Emerald)!.copy({opacity: 0.2});

    return (
        <g>
            {curvePathData && (
                <path
                    d={curvePathData}
                    className={'stroke-gray-600 stroke-1 opacity-25 fill-transparent'}
                ></path>
            )}
            {glow && curvePathData && (
                <>
                    <path
                        d={curvePathData}
                        stroke={emeraldGlow.formatHsl()}
                        strokeWidth={4}
                        strokeLinecap={'round'}
                        className={'fill-transparent'}
                    ></path>
                    {showArrowsToParents && (
                        <path
                            style={{
                                translate: `${arrowToParentLocation.x}px ${arrowToParentLocation.y}px`,
                                rotate: `${parentRotationAngle}deg`
                            }}
                            fill={'none'}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke={Emerald}
                            d="m-7.5 7.5 7.5-7.5 7.5 7.5"
                        />
                    )}
                    {showArrowsToChildren && (
                        <path
                            style={{
                                translate: `${arrowToChildLocation.x}px ${arrowToChildLocation.y}px`,
                                rotate: `${childRotationAngle}deg`
                            }}
                            fill={'none'}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke={Emerald}
                            d="m-7.5 7.5 7.5-7.5 7.5 7.5"
                        />
                    )}
                </>
            )}
        </g>
    );
}