const input = document.getElementById('terminal-input');
const historyContainer = document.getElementById('terminal-history');
const ghostText = document.getElementById('ghost-text');
const container = document.getElementById('terminal-container');
const guiMode = document.getElementById('gui-mode');

const COMMANDS = [
    'help', 
    'whoami', 
    'projects', 
    'clear', 
    'render --gui', 
    'exit', 
    'cd ..'
];

let mode = 'terminal';

// Handle Input
input.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val) {
        const match = COMMANDS.find(cmd => cmd.startsWith(val));
        if (match) {
            ghostText.textContent = match;
        } else {
            ghostText.textContent = '';
        }
    } else {
        ghostText.textContent = '';
    }
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        if (ghostText.textContent) {
            input.value = ghostText.textContent;
        }
    }
    
    if (e.key === 'Enter') {
        const cmd = input.value.trim();
        handleCommand(cmd);
        input.value = '';
        ghostText.textContent = '';
    }
});

function handleCommand(cmd) {
    if (mode === 'buffer' && (cmd === 'exit' || cmd === 'cd ..')) {
        closeBuffer();
        return;
    }

    addLog(`guest@jrilym-portal:~$ ${cmd}`);

    switch(cmd.toLowerCase()) {
        case 'help':
            addLog('Available commands: help, whoami, projects, clear, render --gui');
            break;
        case 'whoami':
            addLog('Name: Jrilym');
            addLog('Role: Fullstack Developer');
            addLog('Interests: TUI, AI, Web Optimization');
            break;
        case 'projects':
            openBuffer('Projects List', [
                '1. E-Commerce POS (Flutter)',
                '2. Portfolio v2 (Next.js)',
                '3. AI Scaffolding Hub'
            ]);
            break;
        case 'clear':
            historyContainer.innerHTML = '';
            break;
        case 'render --gui':
            switchMode('gui');
            break;
        case '':
            break;
        default:
            addLog(`Command not found: ${cmd}. Type 'help' for assistance.`);
    }
    
    historyContainer.scrollTop = historyContainer.scrollHeight;
}

function addLog(text) {
    const line = document.createElement('div');
    line.className = 'line';
    line.textContent = text;
    historyContainer.appendChild(line);
}

function openBuffer(title, contentArray) {
    mode = 'buffer';
    const buffer = document.createElement('div');
    buffer.id = 'active-buffer';
    buffer.className = 'virtual-buffer';
    buffer.style.display = 'flex';
    
    buffer.innerHTML = `
        <div class="buffer-header">${title}</div>
        <div class="buffer-content">
            ${contentArray.map(item => `<div class="line">${item}</div>`).join('')}
            <br>
            <div class="line welcome">Type 'exit' or 'cd ..' to return</div>
        </div>
    `;
    
    container.appendChild(buffer);
    input.placeholder = '(projects) type exit to return...';
}

function closeBuffer() {
    mode = 'terminal';
    const buffer = document.getElementById('active-buffer');
    if (buffer) buffer.remove();
    input.placeholder = '';
    addLog('Returned to main terminal.');
}

function switchMode(target) {
    if (target === 'gui') {
        guiMode.classList.remove('hidden');
        setTimeout(() => guiMode.classList.add('visible'), 50);
        addLog('Launching Graphical Interface...');
    } else {
        guiMode.classList.remove('visible');
        setTimeout(() => guiMode.classList.add('hidden'), 800);
    }
}

// Focus input on click anywhere
document.addEventListener('click', () => {
    if (!guiMode.classList.contains('visible')) {
        input.focus();
    }
});
