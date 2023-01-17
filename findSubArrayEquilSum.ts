/**
Написать функцию sostavChisla(massivChisel: number[], chislo: number), 
которая бы находила все возможные комбинации чисел из massivChisel, 
сумма которых равна chislo. При этом:
1) massivChisel содержит, только уникальные положительные числа (> 0)
2) в комбинации не должно быть повторений чисел
3) все комбинации должны быть уникальными

Для проверки работоспособности функции запустить runTests()

@param massivChisel: number[]
@param chislo: number[]
@return Array<number[]>
*/

function sostavChisla(massivChisel:Array<number>, chislo:number) {
  // для ускорения работы программы выкинем все лишние цифры
  // (которые повторяются или заведомо больше chislo)
  const workMassive = massivChisel.filter( (num:number) => num < chislo);
  const newSet = new Set(workMassive);
  let uniqueNumbers = Array.from(newSet) as Array<number>; 
  // отсортируем их
  uniqueNumbers = uniqueNumbers.sort(); 
  

/*
        static void summ2(int[] num, int n, int m)
        {
            int[] way = new int[m+1];
            for (int i = 0; i <= m; ++i)
                way[i] = 0;

            way[0] = 1;

            for (int i = 0; i < n; ++i)
                for (int j = m; j > 0; --j)
                    if (way[j] == 0 && j >= num[i] && way[j-num[i]] != 0)
                        way[j] = num[i];

            if (way[m] == 0)
                Console.WriteLine("Всё плохо");
            else
            {
                Console.Write("Всё хорошо, путь: ");
                for (int i = m; i != 0; i -= way[i])
                    Console.Write("{0} ", way[i]);
                Console.WriteLine("");
            }
        }

            summ2(m, l, needed);

        }
    }
}
*/

  // подходящие наборы будем сохранять в массив results
  let results:Array<number[]> = [];
  // собираем массив всех возможных перестановок
  let arrIndex:Array<number> = [0];
  let cases:Array<number[]> = [];
  for(let i = 1; i < uniqueNumbers.length; i++) {
    arrIndex.push(i);
     cases.push( ...combinations(arrIndex, i) );
  
  }
  {
    cases.forEach( (comb:Array<number>) => {
      console.log(uniqueNumbers, "comb=", comb);
      const summ:number = comb.reduce((a, b) => { return (a + b) } );
      // если сумма равна числу добавляем в результаты
      if (summ === chislo) {
        results.push([...comb]);
      }
    })
  }
  return results;
}


/** Функция генерации сочетаний - теория https://www.youtube.com/watch?v=yTIRwioT8W4
 @param arr - входной массив индексов
@param k - количество значений в одном наборе
*/

function combinations(arr:Array<number>, k: number): Array<number[]> {
    // объявляем рабочий массив и массив результов
    const workArr:Array<number> = [];
    const results:Array<number[]> = [];
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


function compareNumericArrays(arr1: string | any[], arr2: string | any[]) {
  if(arr1.length !== arr2.length) {
    return false;
  }
  
  arr1 = [...arr1].sort();
  arr2 = [...arr2].sort();
  
  for(let i=0; i<arr1.length; i++) {
    if(arr1[i] !== arr2[i]) {
      return false;
    }
  }
  
  return true;
}

function compareArraysOfNumericArrays(arr1: string | any[], arr2: any[]) {
  if(arr1.length !== arr2.length) {
    return false;
  }
  
  for(let el1 of arr1) {
    if(arr2.findIndex((el2: any) => compareNumericArrays(el1, el2)) < 0) {
      return false;
    }
  }
  
  return true;
}

//runTests();
//console.log(sostavChisla([8, 2, 3, 4, 6, 7, 1], 5));
console.log(summ2([8, 2, 3, 4, 6, 7, 1], 7, 5));

//console.log( combinations([0,1,2,3,4],3) );

function runTests() {
    const tests = [
    {
      chislo: 5, 
      massivChisel: [8, 2, 3, 4, 6, 7, 1],
      result: [[2, 3], [4, 1]]
    },
    {
      chislo: 99, 
      massivChisel: [8, 2, 3, 4, 6, 7, 1],
      result: []
    },
    {
      chislo: 8, 
      massivChisel: [1, 2, 3, 4, 5, 6, 7, 8],
      result: [[1, 3, 4], [1, 2, 5], [3, 5], [2, 6], [1, 7], [8]]
    },
    {
      chislo: 8, 
      massivChisel: [7, 8, 3, 4, 5, 6, 1, 2],
      result: [[1, 3, 4], [1, 2, 5], [3, 5], [2, 6], [1, 7], [8]]
    },
    {
      chislo: 15, 
      massivChisel: [7, 8, 3, 4, 5, 6, 1, 2],
      result: [[1, 2, 3, 4, 5], [2, 3, 4, 6], [1, 3, 5, 6], [4, 5, 6], [1, 3, 4, 7], [1, 2, 5, 7], [3, 5, 7], [2, 6, 7], [1, 2, 4, 8], [3, 4, 8], [2, 5, 8], [1, 6, 8], [7, 8]]
    },  
    
  ];

  let errors = 0;
  for(const test of tests) {
    let result: number[][];
    try{
      result = sostavChisla(test.massivChisel, test.chislo);
      
      if(!compareArraysOfNumericArrays(
          result, 
          test.result)
      ) {
        errors++;
        console.log('--------------------------------------------')
        console.log("failed for test", test, "Got result", result);
      }
    } catch(_e) {
      const e = _e as Error;
      errors++;
      console.log("failed for", test, 'exception', e.message);
    }    
  }

  if(errors === 0) {
    console.log('checkStringForBracects test successfuly completed');
  } else {
    console.log(`checkStringForBracects test failed with ${errors} errors`);
  }
}

function num(value: number, index: number, array: number[]): value is number {
  throw new Error("Function not implemented.");
}


/*
Ладно. Рассмотрим всё по порядку. 
Пусть у нас есть m целых положительных элементов a[i] 
и трубеится найти можно ли из них составить сумму равную n. 
Создадим массив can[i][k] размера m на n+1. can[i][k] = 1, 
если мы можем получить каким-то образом суммируя только элементы a[0]...a[i] сумму равную k. 
Нас интерисует значение can[m][n], т.е. можем ли мы получить используя элементы a[0]...a[m] сумму n.
Очевидно can[0][k] = 0, для всех k != a[0] и k != 0. can[0][0] = 1 и can[0][a[0]] = 1. 
Т.е. используя один элемент мы можем получить только сумму равную 0 или этому элементу.
Рассмотрим как по массиву can[i-1] можно построить can[i]. 
Очевидно, что используя i элементов всегда можно получить те же суммы, что и используя i=1 элемент 
(просто не добавляя к прежним суммам i-й элемент). Т.е. если can[i-1][k]=1, то can[i][k]=1 так же. 
Кроме того, к любой из прежних сумм мы можем добавить i-й элемент, т.е. если can[i-1][k]=1, то can[i][k+a[i]]=1 так же. 
Во всех остальных случаях can[i][k]=0.
Реализация вышеописанного в (псевдо)коде будет выглядеть вот так:
m (uniqueNumbers)
n (chislo)
const workArray:Array<number[]> //(uniqueNumbers.length, chislo+1)

*/
function summ2(arr:Array<number>, n:number, mLenght:number) {
  let way:Array<number> = [];
//  way.fill(0);
  for (let i = 0; i <= mLenght; ++i) {
    way[i] = 0;
  }
  way[0] = 1;

  for (let i = 0; i < n; ++i) {
    for (let j = mLenght; j > 0; --j) {
      if (way[j] == 0 && j >= arr[i] && way[j - arr[i]] != 0) {
        way[j] = arr[i];
      }
    }
  }
  if (way[mLenght] == 0) {
    console.log('net resheniy');
  }else{
    console.log('calc start...');
    for (let i = mLenght; i != 0; i -= way[i]) {
      console.log("{o}", way[i]);
      
    }
  }
}

