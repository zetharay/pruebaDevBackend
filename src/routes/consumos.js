const { Router } = require('express');
const moment = require('moment');
const router = new Router();
const XLSX = require('xlsx');

function leerExcel(ruta) {
    var wopts = {bookType: 'xlsx', compression:false};
    const workbook = XLSX.readFile(ruta, wopts);
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    const jDatos = [];

    for (let i = 0; i < dataExcel.length; i++) {
        const dato = dataExcel[i];

        jDatos.push({
            ...dato, 
            meter_date: new Date((dato.meter_date - (25567 + 2)) * 86400 * 1000).toISOString()
            .replace('T', " ")
            .replace('.000Z', "")
            .replace('.999Z', "")
        });
    }

    return jDatos;
}

const datosExcelJson = leerExcel(process.cwd()+ "\\src\\routes\\query_result_2022.xlsx");

router.get('/', (req, res) => {
    const { date, period } = req.body;

    if (!date) {
        res.sendStatus(400);
    }

    if (!period) {
        res.sendStatus(400);
    } else {
        if (period === 'daily') {
            resultado = new Object;
            let anterior = '';
            let anteriorValor = '';
            let u = 1;

            const array2 = datosExcelJson
                .filter(({ meter_date }) => meter_date.substring(0, 10) === date)
                .map(( array ) => {
                    return {
                        active_energy: array.active_energy,
                        meter_date: array.meter_date.substring(0, 13)
                    }
                })
                .reduce((rv, x, ind, array) => {
                    let ultimo = array.length;

                    if (x.meter_date != anterior || u == 1 || ultimo == u) {
                        if (u > 1) {
                            rv[anterior] = (anteriorValor || 0) - rv[anterior];
                        }

                        if (ultimo != u) {
                            rv[x.meter_date] = (rv[x.meter_date] || 0) + x.active_energy
                        }
                    }

                    anterior = x.meter_date;
                    anteriorValor = x.active_energy;

                    u++;
                    return rv;
                }, {})

            resultado2 = new Object;
            i          = 1;

            for (let clave in array2) {
                resultado3 = new Object;
                resultado3['meter_date'] = clave + ':00:00';
                resultado3['active_energy'] = array2[clave];
                resultado2[i] = resultado3;
                i++;
            }   

            resultado['rows'] = resultado2;
                
            res.json(resultado);
        } else if (period === 'weekly') {
            let fechaInicio = new Date(date);
            let fechaFin = new Date(date);
            let date2 = moment(date).weekday();
            fechaInicio.setDate(fechaInicio.getDate() - (date2 - 1));
            fechaFin.setDate(fechaFin.getDate() + (7 - date2));

            let resultado = new Object;
            let anterior = '';
            let anteriorValor = '';
            let u = 1;

            const array2 = datosExcelJson
                .filter(({ meter_date }) => meter_date.substring(0, 10) >= fechaInicio.toISOString().substring(0, 10) && meter_date.substring(0, 10) <= fechaFin.toISOString().substring(0, 10))
                .map(( array ) => {
                    return {
                        active_energy: array.active_energy,
                        meter_date: array.meter_date.substring(0, 10)
                    }
                })
                .reduce((rv, x, ind, array) => {
                    let ultimo = array.length;

                    if (x.meter_date != anterior || u == 1 || ultimo == u) {
                        if (u > 1) {
                            rv[anterior] = (anteriorValor || 0) - rv[anterior];
                        }

                        if (ultimo != u) {
                            rv[x.meter_date] = (rv[x.meter_date] || 0) + x.active_energy
                        }
                    }

                    anterior = x.meter_date;
                    anteriorValor = x.active_energy;

                    u++;
                    return rv;
                }, {})

            let resultado2 = new Object;
            i          = 1;

            for (let clave in array2) {
                let resultado3 = new Object;
                resultado3['meter_date'] = clave + ' 00:00:00';
                resultado3['active_energy'] = array2[clave];
                resultado2[i] = resultado3;
                i++;
            }   

            resultado['rows'] = resultado2;
                
            res.json(resultado);
        } else if (period === 'monthly') {
            let resultado = new Object;
            let anterior = '';
            let anteriorValor = '';
            let u = 1;

            const array2 = datosExcelJson
                .filter(({ meter_date }) => meter_date.substring(0, 7) === date.substring(0, 7))
                .map(( array ) => {
                    return {
                        active_energy: array.active_energy,
                        meter_date: array.meter_date.substring(0, 10)
                    }
                })
                .reduce((rv, x, ind, array) => {
                    let ultimo = array.length;

                    if (x.meter_date != anterior || u == 1 || ultimo == u) {
                        if (u > 1) {
                            rv[anterior] = (anteriorValor || 0) - rv[anterior];
                        }

                        if (ultimo != u) {
                            rv[x.meter_date] = (rv[x.meter_date] || 0) + x.active_energy
                        }
                    }

                    anterior = x.meter_date;
                    anteriorValor = x.active_energy;

                    u++;
                    return rv;
                }, {})

            let resultado2 = new Object;
            i          = 1;

            for (let clave in array2) {
                let resultado3 = new Object;
                resultado3['meter_date'] = clave + ' 00:00:00';
                resultado3['active_energy'] = array2[clave];
                resultado2[i] = resultado3;
                i++;
            }   

            resultado['rows'] = resultado2;
                
            res.json(resultado);
        } else {
            res.send('Período inválido.');
        }
    }
});

router.post('/', (req, res) => {
    const { date, period } = req.body;

    if (!date) {
        res.sendStatus(400);
    }

    if (!period) {
        res.sendStatus(400);
    } else {
        if (period === 'daily') {
            resultado = new Object;
            let anterior = '';
            let anteriorValor = '';
            let u = 1;

            const array2 = datosExcelJson
                .filter(({ meter_date }) => meter_date.substring(0, 10) === date)
                .map(( array ) => {
                    return {
                        active_energy: array.active_energy,
                        meter_date: array.meter_date.substring(0, 13)
                    }
                })
                .reduce((rv, x, ind, array) => {
                    let ultimo = array.length;

                    if (x.meter_date != anterior || u == 1 || ultimo == u) {
                        if (u > 1) {
                            rv[anterior] = (anteriorValor || 0) - rv[anterior];
                        }

                        if (ultimo != u) {
                            rv[x.meter_date] = (rv[x.meter_date] || 0) + x.active_energy
                        }
                    }

                    anterior = x.meter_date;
                    anteriorValor = x.active_energy;

                    u++;
                    return rv;
                }, {})

            resultado2 = new Object;
            i          = 1;

            for (let clave in array2) {
                resultado3 = new Object;
                resultado3['meter_date'] = clave + ':00:00';
                resultado3['active_energy'] = array2[clave];
                resultado2[i] = resultado3;
                i++;
            }   

            resultado['rows'] = resultado2;
                
            res.json(resultado);
        } else if (period === 'weekly') {
            let fechaInicio = new Date(date);
            let fechaFin = new Date(date);
            let date2 = moment(date).weekday();
            fechaInicio.setDate(fechaInicio.getDate() - (date2 - 1));
            fechaFin.setDate(fechaFin.getDate() + (7 - date2));

            let resultado = new Object;
            let anterior = '';
            let anteriorValor = '';
            let u = 1;

            const array2 = datosExcelJson
                .filter(({ meter_date }) => meter_date.substring(0, 10) >= fechaInicio.toISOString().substring(0, 10) && meter_date.substring(0, 10) <= fechaFin.toISOString().substring(0, 10))
                .map(( array ) => {
                    return {
                        active_energy: array.active_energy,
                        meter_date: array.meter_date.substring(0, 10)
                    }
                })
                .reduce((rv, x, ind, array) => {
                    let ultimo = array.length;

                    if (x.meter_date != anterior || u == 1 || ultimo == u) {
                        if (u > 1) {
                            rv[anterior] = (anteriorValor || 0) - rv[anterior];
                        }

                        if (ultimo != u) {
                            rv[x.meter_date] = (rv[x.meter_date] || 0) + x.active_energy
                        }
                    }

                    anterior = x.meter_date;
                    anteriorValor = x.active_energy;

                    u++;
                    return rv;
                }, {})

            let resultado2 = new Object;
            i          = 1;

            for (let clave in array2) {
                let resultado3 = new Object;
                resultado3['meter_date'] = clave + ' 00:00:00';
                resultado3['active_energy'] = array2[clave];
                resultado2[i] = resultado3;
                i++;
            }   

            resultado['rows'] = resultado2;
                
            res.json(resultado);
        } else if (period === 'monthly') {
            let resultado = new Object;
            let anterior = '';
            let anteriorValor = '';
            let u = 1;

            const array2 = datosExcelJson
                .filter(({ meter_date }) => meter_date.substring(0, 7) === date.substring(0, 7))
                .map(( array ) => {
                    return {
                        active_energy: array.active_energy,
                        meter_date: array.meter_date.substring(0, 10)
                    }
                })
                .reduce((rv, x, ind, array) => {
                    let ultimo = array.length;

                    if (x.meter_date != anterior || u == 1 || ultimo == u) {
                        if (u > 1) {
                            rv[anterior] = (anteriorValor || 0) - rv[anterior];
                        }

                        if (ultimo != u) {
                            rv[x.meter_date] = (rv[x.meter_date] || 0) + x.active_energy
                        }
                    }

                    anterior = x.meter_date;
                    anteriorValor = x.active_energy;

                    u++;
                    return rv;
                }, {})

            let resultado2 = new Object;
            i          = 1;

            for (let clave in array2) {
                let resultado3 = new Object;
                resultado3['meter_date'] = clave + ' 00:00:00';
                resultado3['active_energy'] = array2[clave];
                resultado2[i] = resultado3;
                i++;
            }   

            resultado['rows'] = resultado2;
                
            res.json(resultado);
        } else {
            res.send('Período inválido.');
        }
    }
});

module.exports = router;