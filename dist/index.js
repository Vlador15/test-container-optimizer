"use strict";
/**
 * ContainerOptimizer испольуется для динамического отображения/скрытий блоков, входящих в допусим диапазон (`maxDisplayCount`)
 */
class ContainerOptimizer {
    container; // рендер-контейнер
    buffer; // хранение всех данных
    maxDisplayCount; // сколько блоков можем отображать
    cursor; // Указатель для границы справа
    /**
     * Создаёт экземпляр ContainerOptimizer
     * @constructor
     * @this {ContainerOptimizer}
     * @param {string} containerId — ID контейнера в DOM-дереве
     * @param {number} maxDisplayCount — Ограничение видимых блоков в контейнере
     * @param {number} initState — Исходный массив с данными
     * */
    constructor(containerId, maxDisplayCount = 5, initState = []) {
        const container = document.getElementById(containerId);
        if (!container)
            throw new Error("Failed to find a container element.");
        this.container = container;
        this.maxDisplayCount = maxDisplayCount;
        this.buffer = initState;
        this.cursor = {
            left: 0,
            right: maxDisplayCount - 1,
        };
        // Проверка наличия элементов изначально в контейнере
        this.initialize();
        // Обработка экшенов
        const addButton = document.getElementById("add-btn");
        const removeButton = document.getElementById("remove-btn");
        if (addButton && removeButton) {
            addButton.addEventListener("click", () => this.addBlock());
            removeButton.addEventListener("click", () => this.removeBlock());
        }
        else {
            console.error("Actions button not found");
        }
    }
    /**
     * Проверяет наличие существующих блоков в контейнере и сохраняет их
     * */
    initialize() {
        const children = [...this.container.children];
        // Добавляем в буфер исходные данные в нужном формате
        this.buffer.unshift(...children.map(el => getObject(Number(el.textContent))));
        // Заполняем блоками, если изначально меньше положенного
        if (children.length > this.maxDisplayCount)
            return;
        for (let i = children.length; i < this.maxDisplayCount; i++) {
            const block = document.createElement("div");
            if (this.buffer[i]) {
                block.textContent = String(this.buffer[i].value ?? "-");
            }
            this.container.append(block);
        }
        this.log();
        console.log(this.buffer);
    }
    /**
     * Добавляет новый блок в конец контейнера
     * */
    addBlock() {
        const block = document.createElement("div");
        this.cursor.left += 1;
        this.cursor.right += 1;
        let text = "-";
        if (this.buffer[this.cursor.right]) {
            text = String(this.buffer[this.cursor.right].value ?? "-");
        }
        block.textContent = String(text);
        this.container.append(block);
        // Динамически удаляем первый блок, не влезяющий в допустимый диапазон
        this.container.removeChild(this.container.children[0]);
        this.log();
    }
    /**
     * Удаляет последний блок в контейнере
     * */
    removeBlock() {
        if (this.container.children.length === 0)
            return;
        if (this.buffer.length === 0)
            return;
        if (this.cursor.left === 0)
            return;
        this.cursor.left -= 1;
        this.cursor.right -= 1;
        const removeBlock = [...this.container.children].at(-1);
        this.container.removeChild(removeBlock);
        // Динамически добавляем блок в начало для заполнения диапазона
        const block = document.createElement("div");
        let text = "-";
        if (this.buffer[this.cursor.left]) {
            text = String(this.buffer[this.cursor.left].value ?? "-");
        }
        block.textContent = String(text);
        this.container.prepend(block);
        this.log();
    }
    log() {
        console.log(`Отображен участок: ${this.cursor.left}-${this.cursor.right} (из ${this.buffer.length} эл.)`);
    }
}
/**
 * Генерация рандомного блока
 * */
const getObject = (value) => {
    // Генерация объекта с известнными данными
    if (value)
        return {
            value,
        };
    // Рандомно возвращаем пустой объект
    if (Math.round(Math.random()) === 0)
        return {};
    // Рандомно заполняем объект данными
    return {
        value: Math.floor(Math.random() * 1000),
    };
};
const mock_blocks = Array.from({ length: 10000 }, getObject);
const container = new ContainerOptimizer("container", 5, mock_blocks);
