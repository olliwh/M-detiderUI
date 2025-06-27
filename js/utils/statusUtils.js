export const STATUS = {
    OFFICE: "office",
    HOME: "home",
    SICK: "sick",
    HOLIDAY: "holiday",
    UNKNOWN: "unknown",
};

export const COLOR_TO_STATUS = {
    "#28de3d": STATUS.OFFICE,
    "#3026de": STATUS.HOME,
    "#ee1f41": STATUS.SICK,
    "#efb145": STATUS.HOLIDAY,
};
export const STATUS_TEXT = {
    [STATUS.OFFICE]: 'Kontor',
    [STATUS.HOME]: 'Arbejder Hjemme',
    [STATUS.SICK]: 'Syg',
    [STATUS.HOLIDAY]: 'Ferie',
    [STATUS.UNKNOWN]: 'Ukendt'
};

export function getStatusFromColor(color) {
  return COLOR_TO_STATUS[color] || STATUS.UNKNOWN;
}