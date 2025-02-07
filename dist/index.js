"use strict";
class ContainerOptimizer {
    container; // рендер-контейнер
    stack; // стек всех блоков
    maxDisplayCount; // сколько блоков можем отображать
    count; // счетчик блоков
    constructor(containerId, maxDisplayCount = 5) {
        const container = document.getElementById(containerId);
        if (!container)
            throw new Error("Failed to find a container element.");
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
            addButton.addEventListener("click", this.addBlock);
            removeButton.addEventListener("click", this.removeBlock);
        }
        else {
            console.error("Actions button not found");
        }
    }
    initialize() {
        const blocks = [...this.container.children];
        blocks.forEach(el => {
            this.stack.push(el);
            if (Number(el.textContent) + 1 > this.count) {
                this.count = Number(el.textContent);
            }
        });
    }
    addBlock() {
        const block = document.createElement("div");
        const newValue = this.count + 1;
        this.count = newValue;
        block.textContent = String(newValue);
        this.container.append(block);
        this.stack.push(block);
        if (this.stack.length > this.maxDisplayCount) {
            const leftBorder = this.stack.length - 1 - this.maxDisplayCount;
            this.container.removeChild(this.stack[leftBorder]);
        }
    }
    removeBlock() {
        if (this.stack.length === 0)
            return;
        const removeBlock = this.stack.pop();
        this.container.removeChild(removeBlock);
        this.count--;
        const leftBorder = this.stack.length - this.maxDisplayCount;
        if (this.stack[leftBorder]) {
            this.container.prepend(this.stack[leftBorder]);
        }
    }
}
const container = new ContainerOptimizer("container");
