/**
 * ContainerOptimizer испольуется для динамического отображения/скрытий блоков, входящих в допусим диапазон (`maxDisplayCount`)
 */
class ContainerOptimizer {
    container: HTMLElement; // рендер-контейнер
    stack: HTMLElement[]; // стек всех блоков
    maxDisplayCount: number; // сколько блоков можем отображать
    count: number; // счетчик блоков

    /**
     * Создаёт экземпляр ContainerOptimizer
     * @constructor
     * @this {ContainerOptimizer}
     * @param {string} containerId — ID контейнера в DOM-дереве
     * @param {number} maxDisplayCount — Ограничение видимых блоков в контейнере
     * */
    constructor(containerId: string, maxDisplayCount: number = 5) {
        const container = document.getElementById(containerId);
        if (!container) throw new Error("Failed to find a container element.");

        this.container = container;
        this.maxDisplayCount = maxDisplayCount;
        this.count = 1;
        this.stack = [];

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

    /**
     * Проверяет наличие существующих блоков в контейнере и сохраняет их
     * */
    initialize() {
        [...this.container.children].forEach(el => {
            this.stack.push(el as HTMLElement);

            // Запоминаем последнее число в блоке (для генерации новых)
            if (Number(el.textContent) + 1 > this.count) {
                this.count = Number(el.textContent);
            }
        });
    }

    /**
     * Добавляет новый блок в конец контейнера
     * */
    addBlock(): void {
        const block = document.createElement("div");
        const newValue = this.count + 1;

        this.count = newValue;
        block.textContent = String(newValue);
        this.container.append(block);
        this.stack.push(block);

        // Динамически удаляем последний блок, не влезающий в диапазон maxDisplayCount
        if (this.stack.length > this.maxDisplayCount) {
            const leftBorder = this.stack.length - 1 - this.maxDisplayCount;
            this.container.removeChild(this.stack[leftBorder]);
        }
    }
    
    /**
     * Удаляет последний блок в контейнере
     * */
    removeBlock(): void {
        if (this.stack.length === 0) return;

        const removeBlock = this.stack.pop();
        this.container.removeChild(removeBlock as HTMLElement);
        this.count--;

        // Динамически добавляем блок в начало для заполнения диапазона
        const leftBorder = this.stack.length - this.maxDisplayCount;
        if (this.stack[leftBorder]) {
            this.container.prepend(this.stack[leftBorder]);
        }
    }
}


const container = new ContainerOptimizer("container");