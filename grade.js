//nota final calculada
function calcWeightedGrade(items) {
    if (!Array.isArray(items)) {
        throw new TypeError("items debe ser un arreglo");
    }

    //cada item tiene valor numerico
    for (const item of items) {
        if (typeof item.score !== 'number' || typeof item.weight !== 'number') {
        throw new TypeError('score y weight deben ser números');
        }
        //validacion
        if (item.score < 0 || item.score > 100) {
        throw new RangeError("score debe estar entre 0 y 100");
        }
        if (item.weight < 0 || item.weight > 1) {
        throw new RangeError('weight debe estar entre 0 y 1');
        }
    }

    //sumar weights
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    if (Math.abs(totalWeight - 1) > 0.001) {
        throw new RangeError('La suma de los weights debe ser 1 (±0.001)');
    }

    //nota final ponderada
    const weightedSum = items.reduce((sum, item) => sum + item.score * item.weight, 0);
    return Number(weightedSum.toFixed(2));
    }

    //Funcion percentil
    function percentile(p, values) {
    //validacion de tipos
    if (typeof p !== 'number') {
        throw new TypeError('p debe ser un número');
    }
    if (!Array.isArray(values) || values.length === 0) {
        throw new TypeError('values debe ser un arreglo no vacío');
    }
    if (!values.every(val => typeof val === 'number')) {
        throw new TypeError('todos los valores deben ser números');
    }

    //condicion
    if (p < 0 || p > 100) {
        throw new RangeError('p debe estar entre 0 y 100');
    }

    //excepciones para p=0 y p=100
    if (p === 0) {
        return Number(Math.min(...values).toFixed(2));
    }
    if (p === 100) {
        return Number(Math.max(...values).toFixed(2));
    }

    //ordenar valores de menor a mayor
    const sorted = [...values].sort((a, b) => a - b);
    const n = sorted.length;
    //rango de la posicion
    const rank = Math.ceil((p / 100) * n);
    //retornar percentil
    return Number(sorted[rank - 1].toFixed(2));
    }

module.exports = { calcWeightedGrade, percentile };