export function calculateRotationAngle(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    offSetFromDown: number = 90
) {
    // Calculate angle in radians
    const angleRadians = Math.atan2(y2 - y1, x2 - x1);
    // Convert to degrees
    const angleDegrees = angleRadians * (180 / Math.PI);
    // Adjust so that upwards is 0 degrees
    const adjustedAngle = angleDegrees + offSetFromDown;

    // Normalize the angle to a 0-360 range
    let normalizedAngle = adjustedAngle % 360;
    if (normalizedAngle < 0) normalizedAngle += 360;

    return normalizedAngle;
}