document.addEventListener('DOMContentLoaded', () => {
    const printerPartsContainer = document.getElementById('printer-parts');
    const partTitle = document.getElementById('part-title');
    const partDescription = document.getElementById('part-description');
    const partSpecs = document.getElementById('part-specs');
    const specsList = document.getElementById('specs-list');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const detailBtn = document.getElementById('detail-btn');
    const resetBtn = document.getElementById('reset-btn');
    const autoBtn = document.getElementById('auto-btn');
    const partModal = document.getElementById('part-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalImage = document.getElementById('modal-image');
    const modalSpecs = document.getElementById('modal-specs');
    const modalFunfact = document.getElementById('modal-funfact');
    const closeModal = document.querySelector('.close-modal');

    // 3D Printer parts data with realistic details
    const parts = [
        {
            name: "Frame Structure",
            description: "The rigid frame provides stability and precision to the entire printer. Typically made from aluminum extrusions, it ensures minimal vibration during printing.",
            color: "#606060",
            shape: "frame",
            width: 300,
            height: 350,
            bottom: 20,
            left: "50%",
            animation: { scale: [0.8, 1], opacity: [0, 1], easing: 'easeOutElastic' },
            specs: [
                { name: "Material", value: "Aluminum 2040 Extrusion" },
                { name: "Dimensions", value: "400x400x500 mm" },
                { name: "Weight", value: "3.2 kg" }
            ],
            image: "https://m.media-amazon.com/images/I/71YyQ1V3HQL._AC_UF1000,1000_QL80_.jpg",
            funfact: "The frame's rigidity directly impacts print quality. A 1mm vibration can cause visible artifacts in your prints."
        },
        {
            name: "Print Bed",
            description: "The heated build plate where printing occurs. It provides adhesion for the first layer and can be heated to prevent warping of materials like ABS.",
            color: "#3a3a3a",
            shape: "rectangle",
            width: 220,
            height: 220,
            bottom: 40,
            left: "50%",
            animation: { translateY: [50, 0], opacity: [0, 1], easing: 'easeOutBack' },
            specs: [
                { name: "Type", value: "Heated Bed" },
                { name: "Max Temperature", value: "120°C" },
                { name: "Surface", value: "PEI Coated Spring Steel" },
                { name: "Leveling", value: "Auto Bed Leveling" }
            ],
            image: "https://www.creality3dofficial.com/cdn/shop/products/Creality3D-Ender-3-S1-Pro-3D-Printer-print-heated-bed_900x.jpg",
            funfact: "Early 3D printers used bare glass beds, but modern surfaces like PEI provide excellent adhesion when hot and easy release when cool."
        },
        {
            name: "Y-Axis Rails",
            description: "Precision linear rails that allow the print bed to move forward and backward (Y-axis). These ensure smooth, accurate movement with minimal friction.",
            color: "#808080",
            shape: "rail-y",
            width: 300,
            height: 20,
            bottom: 40,
            left: "50%",
            animation: { translateX: [-20, 0], opacity: [0, 1], easing: 'easeOutQuad' },
            specs: [
                { name: "Type", value: "Linear Rails" },
                { name: "Length", value: "400 mm" },
                { name: "Accuracy", value: "±0.01 mm" }
            ],
            image: "https://www.igus.com/info/wp-content/uploads/2020/06/drylin_R_dry-bearing_linear_guide.jpg",
            funfact: "Some high-end printers use magnetic levitation for movement, completely eliminating friction from rails."
        },
        {
            name: "X-Axis Gantry",
            description: "The horizontal beam that carries the print head along the X-axis. It's supported by two vertical Z-axis rods or leadscrews.",
            color: "#505050",
            shape: "gantry",
            width: 300,
            height: 40,
            bottom: 300,
            left: "50%",
            animation: { translateY: [-50, 0], opacity: [0, 1], easing: 'easeOutBack' },
            specs: [
                { name: "Material", value: "Aluminum Extrusion" },
                { name: "Length", value: "400 mm" },
                { name: "Motion", value: "Dual Z-Screw Driven" }
            ],
            image: "https://www.v1e.com/cdn/shop/products/Ender-3-X-Axis-Aluminum-Alloy-Extrusion-Profile-2020-400mm-For-Creality-3D-Printer-Parts-1_800x.jpg",
            funfact: "CoreXY printers use a different motion system where the gantry doesn't move, reducing weight and increasing speed."
        },
        {
            name: "Extruder Assembly",
            description: "The cold end that feeds filament into the hot end. Modern direct drive extruders mount directly on the print head for better control of flexible filaments.",
            color: "#e74c3c",
            shape: "extruder",
            width: 80,
            height: 60,
            bottom: 300,
            left: "50%",
            animation: { scale: [0, 1], rotate: '+=360', easing: 'easeOutElastic' },
            specs: [
                { name: "Type", value: "Direct Drive" },
                { name: "Gear Ratio", value: "3:1" },
                { name: "Max Speed", value: "150 mm/s" },
                { name: "Compatibility", value: "1.75mm Filament" }
            ],
            image: "https://m.media-amazon.com/images/I/61V5ZQYgZoL._AC_UF1000,1000_QL80_.jpg",
            funfact: "Bowden extruders (with remote feed) can print faster but struggle with flexible materials, while direct drives offer better control."
        },
        {
            name: "Hot End",
            description: "The heated nozzle that melts filament for extrusion. It maintains precise temperature control to ensure consistent material flow.",
            color: "#c0392b",
            shape: "hotend",
            width: 30,
            height: 50,
            bottom: 250,
            left: "50%",
            animation: { translateY: [30, 0], opacity: [0, 1], easing: 'easeOutBack' },
            specs: [
                { name: "Nozzle Size", value: "0.4 mm" },
                { name: "Max Temp", value: "300°C" },
                { name: "Heater", value: "40W Cartridge" },
                { name: "Thermistor", value: "100k NTC" }
            ],
            image: "https://www.3djake.com/img/org/creality-spare-hotend-for-cr-10-ender-3.jpg",
            funfact: "Nozzles can be as small as 0.1mm for ultra-fine detail or as large as 1mm for rapid prototyping."
        },
        {
            name: "Control Board",
            description: "The brain of the printer that interprets G-code and controls all motors, heaters, and sensors. Modern boards support silent stepper drivers.",
            color: "#2c3e50",
            shape: "rectangle",
            width: 100,
            height: 80,
            bottom: 100,
            left: "30%",
            animation: { scale: [0, 1], rotate: '+=180', easing: 'easeOutBack' },
            specs: [
                { name: "Processor", value: "32-bit ARM Cortex" },
                { name: "Drivers", value: "TMC2209 (Silent)" },
                { name: "Firmware", value: "Marlin 2.0" },
                { name: "Interfaces", value: "USB, SD Card, WiFi" }
            ],
            image: "https://m.media-amazon.com/images/I/71V+4s3dWIL._AC_UF1000,1000_QL80_.jpg",
            funfact: "Some advanced printers now run on Raspberry Pi with Klipper firmware for more processing power in the cloud."
        },
        {
            name: "Power Supply",
            description: "Provides stable power to all components. Meanwell power supplies are industry standard for their reliability and safety features.",
            color: "#7f8c8d",
            shape: "rectangle",
            width: 120,
            height: 60,
            bottom: 100,
            left: "70%",
            animation: { scale: [0, 1], rotate: '-=180', easing: 'easeOutBack' },
            specs: [
                { name: "Output", value: "24V 15A" },
                { name: "Efficiency", value: "80 Plus Gold" },
                { name: "Protections", value: "OVP, OCP, SCP" }
            ],
            image: "https://m.media-amazon.com/images/I/71O1xQ0QmIL._AC_UF1000,1000_QL80_.jpg",
            funfact: "24V systems are becoming standard as they allow thinner wires and less power loss than traditional 12V systems."
        },
        {
            name: "Touchscreen Display",
            description: "The user interface for controlling the printer without a computer. Modern color touchscreens make operation intuitive.",
            color: "#3498db",
            shape: "rectangle",
            width: 120,
            height: 80,
            bottom: 200,
            left: "80%",
            animation: { scale: [0, 1], opacity: [0, 1], easing: 'easeOutElastic' },
            specs: [
                { name: "Size", value: "4.3 inch" },
                { name: "Resolution", value: "480x272 px" },
                { name: "Touch", value: "Capacitive" },
                { name: "Connectivity", value: "USB, WiFi" }
            ],
            image: "https://m.media-amazon.com/images/I/71JkTa2VzQL._AC_UF1000,1000_QL80_.jpg",
            funfact: "Some printers now offer webcam integration directly in the display for remote monitoring of prints."
        }
    ];
    
    let currentPart = 0;
    const totalParts = parts.length;
    let autoAssembleInterval = null;
    let assembledParts = [];

    // Create all printer parts (initially hidden)
    parts.forEach((part, index) => {
        const partElement = document.createElement('div');
        partElement.className = 'printer-part';
        partElement.dataset.index = index;
        partElement.dataset.name = part.name;
        
        // Position the part
        partElement.style.bottom = `${part.bottom}px`;
        partElement.style.left = part.left || '50%';
        partElement.style.marginLeft = part.left ? '0' : `-${part.width/2}px`;
        
        // Style the part based on its shape
        if (part.shape === 'rectangle') {
            partElement.style.width = `${part.width}px`;
            partElement.style.height = `${part.height}px`;
            partElement.style.backgroundColor = part.color;
            partElement.style.borderRadius = '4px';
        } 
        else if (part.shape === 'frame') {
            partElement.style.width = `${part.width}px`;
            partElement.style.height = `${part.height}px`;
            partElement.style.border = `5px solid ${part.color}`;
            partElement.style.backgroundColor = 'transparent';
            partElement.style.borderRadius = '0';
        }
        else if (part.shape === 'rail-y') {
            partElement.style.width = `${part.width}px`;
            partElement.style.height = `${part.height}px`;
            partElement.style.backgroundColor = part.color;
            partElement.style.borderRadius = '10px';
            partElement.style.boxShadow = 'inset 0 0 10px rgba(0,0,0,0.3)';
        }
        else if (part.shape === 'gantry') {
            partElement.style.width = `${part.width}px`;
            partElement.style.height = `${part.height}px`;
            partElement.style.backgroundColor = part.color;
            partElement.style.borderRadius = '0';
            partElement.style.borderTop = '3px solid #707070';
            partElement.style.borderBottom = '3px solid #707070';
        }
        else if (part.shape === 'extruder') {
            partElement.style.width = `${part.width}px`;
            partElement.style.height = `${part.height}px`;
            partElement.style.backgroundColor = part.color;
            partElement.style.borderRadius = '10px';
            partElement.style.border = '3px solid #c0392b';
            partElement.innerHTML = '<div class="gear" style="position:absolute;width:30px;height:30px;background-color:#333;border-radius:50%;top:15px;left:25px;"></div>';
        }
        else if (part.shape === 'hotend') {
            partElement.style.width = `${part.width}px`;
            partElement.style.height = `${part.height}px`;
            partElement.style.backgroundColor = 'linear-gradient(to bottom, #c0392b, #e74c3c)';
            partElement.style.backgroundColor = part.color;
            partElement.style.borderRadius = '0 0 15px 15px';
            partElement.style.borderBottom = '3px solid #922';
        }
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = part.name;
        partElement.appendChild(tooltip);
        
        // Add click event for showing details
        partElement.addEventListener('click', (e) => {
            if (partElement.style.opacity === '1') {
                showPartDetails(index);
                e.stopPropagation();
            }
        });
        
        // Add hover effects
        partElement.addEventListener('mouseenter', () => {
            if (partElement.style.opacity === '1') {
                tooltip.style.opacity = '1';
                partElement.classList.add('pulse');
            }
        });
        
        partElement.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            partElement.classList.remove('pulse');
        });
        
        printerPartsContainer.appendChild(partElement);
    });
    
    // Function to animate the next part
    function showNextPart() {
        if (currentPart >= totalParts) {
            // Printer complete!
            partTitle.textContent = "3D Printer Assembly Complete!";
            partDescription.textContent = "Congratulations! You've assembled a complete 3D printer. Now you understand the major components that make additive manufacturing possible.";
            partSpecs.classList.add('hidden');
            detailBtn.classList.add('hidden');
            
            // Celebration animation
            anime({
                targets: '#printer-parts .printer-part',
                translateY: function(el, i) {
                    return i % 2 === 0 ? -10 : 10;
                },
                duration: 1000,
                direction: 'alternate',
                loop: 3,
                easing: 'easeInOutSine'
            });
            
            // Change progress to complete
            progressBar.style.width = '100%';
            progressText.textContent = `${totalParts}/${totalParts}`;
            
            // Enable auto-assemble button again
            autoBtn.disabled = false;
            autoBtn.innerHTML = '<i class="fas fa-magic"></i> Auto-Assemble';
            
            return;
        }
        
        const part = parts[currentPart];
        const partElement = document.querySelector(`.printer-part[data-index="${currentPart}"]`);
        
        // Update info panel
        partTitle.textContent = part.name;
        partDescription.textContent = part.description;
        
        // Show specs
        specsList.innerHTML = '';
        part.specs.forEach(spec => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${spec.name}:</span> <span>${spec.value}</span>`;
            specsList.appendChild(li);
        });
        partSpecs.classList.remove('hidden');
        
        // Show detail button
        detailBtn.onclick = () => showPartDetails(currentPart);
        detailBtn.classList.remove('hidden');
        
        // Animate the part
        anime({
            targets: partElement,
            opacity: [0, 1],
            ...part.animation,
            duration: 1500,
            easing: part.animation.easing || 'easeOutElastic(1, .8)',
            complete: () => {
                assembledParts.push(currentPart);
            }
        });
        
        // Update progress
        const progressPercent = (currentPart / totalParts) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressText.textContent = `${currentPart}/${totalParts}`;
        
        currentPart++;
    }
    
    // Show detailed part view in modal
    function showPartDetails(index) {
        const part = parts[index];
        modalTitle.textContent = part.name;
        modalDescription.textContent = part.description;
        modalImage.src = part.image;
        modalImage.alt = part.name;
        
        // Add specs
        modalSpecs.innerHTML = '';
        part.specs.forEach(spec => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${spec.name}</span> <span>${spec.value}</span>`;
            modalSpecs.appendChild(li);
        });
        
        // Add fun fact
        modalFunfact.textContent = part.funfact;
        
        // Show modal
        partModal.classList.add('active');
    }
    
    // Reset assembly
    function resetAssembly() {
        // Stop auto-assemble if running
        if (autoAssembleInterval) {
            clearInterval(autoAssembleInterval);
            autoAssembleInterval = null;
            autoBtn.disabled = false;
            autoBtn.innerHTML = '<i class="fas fa-magic"></i> Auto-Assemble';
        }
        
        // Hide all parts
        anime({
            targets: '.printer-part',
            opacity: 0,
            scale: 0,
            duration: 500,
            easing: 'easeInOutQuad',
            complete: () => {
                currentPart = 0;
                assembledParts = [];
                progressBar.style.width = '0%';
                progressText.textContent = `0/${totalParts}`;
                
                // Reset info panel
                partTitle.textContent = "Welcome to 3D Printer Assembly";
                partDescription.textContent = "Click anywhere to begin assembling your 3D printer and learning about additive manufacturing technology!";
                partSpecs.classList.add('hidden');
                detailBtn.classList.add('hidden');
            }
        });
    }
    
    // Auto-assemble function
    function startAutoAssemble() {
        autoBtn.disabled = true;
        autoBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Assembling...';
        
        // First reset if needed
        if (currentPart > 0) {
            resetAssembly();
            setTimeout(startAutoAssemble, 1000);
            return;
        }
        
        autoAssembleInterval = setInterval(() => {
            showNextPart();
            if (currentPart >= totalParts) {
                clearInterval(autoAssembleInterval);
                autoAssembleInterval = null;
            }
        }, 2000);
    }
    
    // Click handler for the entire document
    document.addEventListener('click', showNextPart);
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowRight') {
            showNextPart();
        } else if (e.code === 'ArrowLeft' && currentPart > 0) {
            // Optional: Add backward navigation
        }
    });
    
    // Reset button
    resetBtn.addEventListener('click', resetAssembly);
    
    // Auto-assemble button
    autoBtn.addEventListener('click', startAutoAssemble);
    
    // Close modal
    closeModal.addEventListener('click', () => {
        partModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    partModal.addEventListener('click', (e) => {
        if (e.target === partModal) {
            partModal.classList.remove('active');
        }
    });
});