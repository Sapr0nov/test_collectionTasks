
/** Функция рекурсивного подсчета факториала
@param n - базовое число факториала
*/

function factorial(n:number): number {
    if(n < 0){
        throw new Error("Number has to be positive.");
    }
    if(n == 0 || n == 1){
        return 1;
    }else{
        return n * factorial(n-1);
    }
  }
    
  
/** Функция генерации сочетаний - теория https://www.youtube.com/watch?v=yTIRwioT8W4
 @param arr - входной массив индексов
@param k - количество значений в одном наборе
*/
type NumArray = Array<number>;

function combinationsIndex(arr:Array<number>, k: number): Array<NumArray> {
    // информационно - Возможное количество сочетаний n! / k! (n-k)!  (длинна результирующего массива)
    const expectLength = (factorial(arr.length) / ( factorial(k)*factorial(arr.length - k) ));
    // объявляем рабочий массив и массив результов
    const workArr:NumArray = [];
    const results:Array<NumArray> = [];
    // обозначем переменную выхода
    let doSearch = true;
    // инициализируем стартовый массив
    for (let i = 0; i < k; i++ ) {
        workArr[i] = arr[i];
    }
    // первые К элементов берем из исходного массива и добавляем ещё 2 - размер исходного массива и 0
    workArr.push(arr.length);
    workArr.push(0);
    // и сразу записываем первое сочетание в результат
    results.push(workArr.slice(0, k));

    // начинаем рабоут с массивом
    while (doSearch) {
        doSearch = true;
        // проходим по всем элементам и проверяем
        for (let i = 0; i < arr.length; i++ ) {
            // если текущее значение + 1 равно следующему элементу 
            if (workArr[i] + 1 == workArr[i+1]) {
                // назначем текущему номер индекса и идем дальше
                workArr[i] = i;
            } else {
                // иначе проверяем, если индекс текущего элемента
                // больше размера набора - выходим
                if (i < k) {
                // если меньше увеличиваем теущий элемент на 1 и сохраняем в результат 
                workArr[i]++;
                results.push(workArr.slice(0, k));
                // продолжаем цикл с 0 (-1 + 1)
                i = -1;
                }else{
                // завершаем поиск перестановок
                doSearch = false;
                }
            }
        }
    }

return results;
}

console.log( combinationsIndex([0,1,2,3,4,5],4) );