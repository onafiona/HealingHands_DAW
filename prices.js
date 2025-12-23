const services = [
    { name: 'General Consultation', description: 'Comprehensive health assessment' },
    { name: 'Laboratory Tests', description: 'Complete blood and urine tests' },
    { name: 'ECG', description: 'Electrocardiogram for heart evaluation' },
    { name: 'Ultrasound', description: 'Modern diagnostic imaging investigation' }
];

const doctors = [
    {
        name: 'Dr. Maria Popescu',
        specialty: 'Cardiology',
        services: [
            { name: 'Cardiology Consultation', price: 250 },
            { name: 'ECG', price: 150 },
            { name: 'Cardiac Ultrasound', price: 300 },
            { name: 'Cardiac Holter Monitoring', price: 350 }
        ]
    },
    {
        name: 'Dr. Ion Ionescu',
        specialty: 'General Medicine',
        services: [
            { name: 'General Consultation', price: 200 },
            { name: 'Routine Check-up', price: 180 },
            { name: 'Vaccination', price: 100 },
            { name: 'Medical Certificate', price: 80 }
        ]
    },
    {
        name: 'Dr. Elena Dumitrescu',
        specialty: 'Dermatology',
        services: [
            { name: 'Dermatology Consultation', price: 220 },
            { name: 'Acne Treatment', price: 300 },
            { name: 'Mole Examination', price: 250 },
            { name: 'Cryosurgery', price: 400 }
        ]
    },
    {
        name: 'Dr. Andrei Constantinescu',
        specialty: 'Pediatrics',
        services: [
            { name: 'Pediatric Consultation', price: 200 },
            { name: 'Child Vaccination', price: 120 },
            { name: 'Developmental Check-up', price: 180 },
            { name: 'Emergency Consultation', price: 280 }
        ]
    }
];


function generatePricingTables(){
    const container= document.getElementById('doctorsPricing');
    if(!container) return;

    let html='';
    doctors.forEach(doctor => {
        html+=`
        <div class="doctor-pricing-table">
            <h3>${doctor.name} - ${doctor.specialty}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Price (RON)</th>
                    </tr>
                </thead>
                <tbody>
        `;
                doctor.services.forEach(service =>{
                    html+=`
                    <tr>
                        <td>${service.name}</td>
                        <td>${service.price}</td>
                    </tr>
                    `;
                });

                html+=`
                    </tbody>
            </table>
        </div>
        `;
                
    });
    container.innerHTML=html;
}

function populateCalculatorDropdowns(){
    const doctorSelect=document.getElementById('doctorSelect');
    const serviceSelect=document.getElementById('serviceSelect');

    if (!doctorSelect || !serviceSelect) return;
    doctors.forEach((doctor, index) => {
        const option=document.createElement('option');
        option.value=index;
        option.textContent = `${doctor.name} - ${doctor.specialty}`;
        doctorSelect.appendChild(option);
    });

    doctorSelect.addEventListener('change', function() {
        serviceSelect.innerHTML = '<option value="">--Choose a service--</option>';

        if(this.value !== ''){
            const selectedDoctor=doctors[this.value];
            selectedDoctor.services.forEach((service, serviceIndex) => {
                const option = document.createElement('option');
                option.value=serviceIndex;
                option.textContent=`${service.name} - ${service.price} RON`;
                serviceSelect.appendChild(option);
            });
        }
    });
}


function calculateTotal() {
    const doctorSelect = document.getElementById('doctorSelect');
    const serviceSelect=document.getElementById('serviceSelect');
    const newClient = document.getElementById('newClient');
    const result=document.getElementById('result');

    if( doctorSelect.value==='' || serviceSelect.value===''){
        result.innerHTML = '<span style="color:red;">Please select the doctor and service!</span>';
        return;
    }

    const selectedDoctor=doctors[doctorSelect.value];
    const selectedService=selectedDoctor.services[serviceSelect.value];
    const basePrice=selectedService.price;

    let discount=0;
    let total=basePrice
    if(newClient.checked){
        discount=basePrice*0.10;
        total-=discount;
    }

    let html=`
        <strong>Details:</strong><br>
        Doctor:${selectedDoctor.name}<br>
        Service:${selectedService.name}<br>
        Price:${basePrice}<br>
    `;

    if(discount>0){
        html+=`New client discount(10%): -${discount.toFixed(2)} RON<br>`;
    }

    html+=`<br><strong>Total to pay: ${total.toFixed(2)} RON </strong>`;
    result.innerHTML=html;
}


populateCalculatorDropdowns();
generatePricingTables();