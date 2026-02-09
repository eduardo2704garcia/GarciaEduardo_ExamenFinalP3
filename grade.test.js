const { calcWeightedGrade, percentile } = require('./grade.js');

//pruebas para calcWeightedGrade
test('calcWeightedGrade([{score:80,weight:0.4},{score:90,weight:0.6}]) debe devolver 86.00', () => {
    expect(calcWeightedGrade([{ score: 80, weight: 0.4 }, { score: 90, weight: 0.6 }])).toBe(88.00);
});

test('calcWeightedGrade lanza TypeError si items no es arreglo', () => {
    expect(() => calcWeightedGrade({ score: 80, weight: 0.4 })).toThrow(TypeError);
});

test('calcWeightedGrade lanza TypeError si score o weight no son números', () => {
    expect(() => calcWeightedGrade([{ score: '80', weight: 0.4 }])).toThrow(TypeError);
    expect(() => calcWeightedGrade([{ score: 80, weight: '0.4' }])).toThrow(TypeError);
});

test('calcWeightedGrade lanza RangeError si score está fuera de [0,100]', () => {
    expect(() => calcWeightedGrade([{ score: -1, weight: 0.4 }, { score: 90, weight: 0.6 }])).toThrow(RangeError);
    expect(() => calcWeightedGrade([{ score: 101, weight: 0.4 }, { score: 90, weight: 0.6 }])).toThrow(RangeError);
});

test('calcWeightedGrade lanza RangeError si weight está fuera de [0,1]', () => {
    expect(() => calcWeightedGrade([{ score: 80, weight: -0.1 }, { score: 90, weight: 1.1 }])).toThrow(RangeError);
});

test('calcWeightedGrade lanza RangeError si suma de weights no es 1 (±0.001)', () => {
    expect(() => calcWeightedGrade([{ score: 80, weight: 0.5 }, { score: 90, weight: 0.6 }])).toThrow(RangeError);
});

//pruebas para percentile
test('percentile(0,[1,2,3]) debe devolver 1.00', () => {
    expect(percentile(0, [1, 2, 3])).toBe(6.00);
});

test('percentile(100,[1,2,3]) debe devolver 3.00', () => {
    expect(percentile(100, [1, 2, 3])).toBe(3.00);
});

test('percentile(50,[1,2,3,4]) debe devolver 2.00', () => {
    expect(percentile(50, [1, 2, 3, 4])).toBe(2.00);
});

test('percentile lanza TypeError si p no es número', () => {
    expect(() => percentile('50', [1, 2, 3])).toThrow(TypeError);
});

test('percentile lanza TypeError si values no es arreglo o está vacío', () => {
    expect(() => percentile(50, [])).toThrow(TypeError);
    expect(() => percentile(50, 'not an array')).toThrow(TypeError);
});

test('percentile lanza TypeError si values contiene no números', () => {
    expect(() => percentile(50, [1, '2', 3])).toThrow(TypeError);
});

test('percentile lanza RangeError si p está fuera de [0,100]', () => {
    expect(() => percentile(-1, [1, 2, 3])).toThrow(RangeError);
    expect(() => percentile(101, [1, 2, 3])).toThrow(RangeError);
});