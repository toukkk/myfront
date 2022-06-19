function classof(o) {
    if (o === null) return null;
    if (o === undefined) return undefined;
    return Object.prototype.toString.call(o).slice(8, -1);
}