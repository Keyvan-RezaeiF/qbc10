const average = (arr: number[]) => arr.reduce((acc: number, val: number) => acc + val, 0) / arr.length;

export default average