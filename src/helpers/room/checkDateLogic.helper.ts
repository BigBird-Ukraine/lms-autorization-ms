export const checkFunctionLogic = (start_at: Date, close_at: Date, currentS: Date, currentE: Date) => {
    const current_start = new Date(currentS).getTime();
    const current_end = new Date(currentE).getTime();
    const startAt = new Date(start_at).getTime();
    const closeAt = new Date(close_at).getTime();

    let status = false;

    if (current_end < closeAt && current_end > startAt) {
        status = true;
    }

    if (current_start < closeAt && current_start > startAt) {
        status = true;
    }

    if (current_end >= closeAt && current_start <= startAt) {
        status = true;
    }

    return status;
};
