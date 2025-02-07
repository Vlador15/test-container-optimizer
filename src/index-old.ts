/*
type TTask = {
    readonly value?: number
}

/!**
 * ContainerOptimizer испольуется для динамического отображения/скрытий блоков, входящих в допусим диапазон (`maxDisplayCount`)
 *!/
class ContainerOptimizer {
    container: HTMLElement; // рендер-контейнер
    stack: HTMLElement[]; // стек html-block'ов размерностью = 'maxDisplayCount'
    buffer: TTask[]; // хранение всех данных
    maxDisplayCount: number; // сколько блоков можем отображать

    /!**
     * Создаёт экземпляр ContainerOptimizer
     * @constructor
     * @this {ContainerOptimizer}
     * @param {string} containerId — ID контейнера в DOM-дереве
     * @param {number} maxDisplayCount — Ограничение видимых блоков в контейнере
     * @param {number} initState — Исходный массив с данными
     * *!/
    constructor(containerId: string, maxDisplayCount: number = 5, initState: TTask[] = []) {
        const container = document.getElementById(containerId);
        if (!container) throw new Error("Failed to find a container element.");

        this.container = container;
        this.maxDisplayCount = maxDisplayCount;
        this.stack = [];
        this.buffer = initState;

        // Проверка наличия элементов изначально в контейнере
        this.initialize();

        // Обработка экшенов
        const addButton = document.getElementById("add-btn");
        const removeButton = document.getElementById("remove-btn");

        if (addButton && removeButton) {
            addButton.addEventListener("click", () => this.addBlock());
            removeButton.addEventListener("click", () => this.removeBlock());
        } else {
            console.error("Actions button not found");
        }
    }

    /!**
     * Проверяет наличие существующих блоков в контейнере и сохраняет их
     * *!/
    initialize() {
        const childrens = [...this.container.children];

        // Добавляем в буфер исходные данные в нужном формате
        this.buffer.unshift(...childrens.map(el => getObject(Number(el.textContent))));

        // Заполняем
        console.log(this.buffer);
    }

    /!**
     * Добавляет новый блок в конец контейнера
     * *!/
    addBlock(): void {
        const block = document.createElement("div");
        const newValue = getObject();

        block.textContent = String(newValue);
        this.container.append(block);
        this.stack.push(block);

        // Динамически удаляем последний блок, не влезающий в диапазон maxDisplayCount
        if (this.stack.length > this.maxDisplayCount) {
            const leftBorder = this.stack.length - 1 - this.maxDisplayCount;
            this.container.removeChild(this.stack[leftBorder]);
        }
    }

    /!**
     * Удаляет последний блок в контейнере
     * *!/
    removeBlock(): void {
        if (this.stack.length === 0) return;

        const removeBlock = this.stack.pop();
        this.container.removeChild(removeBlock as HTMLElement);

        // Динамически добавляем блок в начало для заполнения диапазона
        const leftBorder = this.stack.length - this.maxDisplayCount;
        if (this.stack[leftBorder]) {
            this.container.prepend(this.stack[leftBorder]);
        }
    }
}


/!**
 * Генерация рандомного блока
 * *!/
const getObject = (value?: number): TTask => {
    // Генерация объекта с известнными данными
    if (value) return {
        value,
    };

    // Рандомно возвращаем пустой объект
    if (Math.round(Math.random()) === 0) return {};

    // Рандомно заполняем объект данными
    return {
        value: Math.floor(Math.random() * 1000),
    };
};

const mock_blocks = Array.from({ length: 100 }, getObject);
const container = new ContainerOptimizer("container", 5, mock_blocks);*/
