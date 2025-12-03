
        // Function to collect all input values
        function collectInputs(event) {
            event.preventDefault(); // Prevent the form from submitting and refreshing the page
    
            // Home Section Inputs
            const carName = document.getElementById("carName").value;
            const carYear = document.getElementById("carYear").value;
            const carTransmission = document.getElementById("carTransmission").value;
            const carGas = document.getElementById("carGas").value;
            const carPrice = document.getElementById("carPrice").value;
            const carYrUse = document.getElementById("carYrUse").value;
            const carTDmonth = document.getElementById("carTDmonth").value;

            //home section input cals
            let yr=carYear;
            let gas=carGas;
            let price=parseFloat(carPrice);
            let n=parseInt(carYrUse);
            let td_month=parseInt(carTDmonth);

            let td=td_month*12*n;
            td = td + 1000;
            let totalMonthlyCost=0.0;

    
            // Maintenance Cost Inputs
            const tyreChangeCost = document.getElementById("tyreChangeCost").value;
            const brakePadLinerCost = document.getElementById("brakePadLinerCost").value;
            const transmissionFluidCost = document.getElementById("transmissionFluidCost").value;
            const coolantReplaceCost = document.getElementById("coolantReplaceCost").value;
            const batteryReplacementCost = document.getElementById("batteryReplacementCost").value;

            //maintenance cost calcs
            let ttc=parseFloat(tyreChangeCost);
            let tbc=parseFloat(brakePadLinerCost);
            let ttf=parseFloat(transmissionFluidCost);
            let tcc=parseFloat(coolantReplaceCost);
            let tbr=parseFloat(batteryReplacementCost);

            ttc=ttc*parseInt(td/30000.0);
            tbc=tbc*parseInt(td/35000.0);
            ttf=ttf*parseInt(td/30000.0);
            tcc=tcc*n;
            tbr=tbr*(n/3.0);

            let tmc=ttc+tbc+ttf+tcc+tbr;

            // Operational Cost Inputs
            const fuelCost = document.getElementById("fuelCost").value;
            const fuelEfficiency = document.getElementById("fuelEfficiency").value;
            const carCostByInsurance = document.getElementById("carCostByInsurance").value;
            const insuranceCost = document.getElementById("insuranceCost").value;

            // operational cost calcs
            let fuel=parseFloat(fuelCost);
            let distance=parseFloat(fuelEfficiency);
            let tic=parseFloat(carCostByInsurance);
            let percentage=parseFloat(insuranceCost);

            let tfc=(parseFloat(td)/distance)*fuel;
            tic=(tic*percentage/100)*n;

            let toc=tfc+tic;
            totalMonthlyCost = totalMonthlyCost + ((parseFloat(td_month)/distance)*fuel) + (parseFloat(tic)/(12.0*n));

            // Service Cost Inputs
            const vehicleEmissionCost = document.getElementById("vehicleEmissionCost").value;
            const serviceCost = document.getElementById("serviceCost").value;
            const carWashCost = document.getElementById("carWashCost").value;

            // service cost calcs
            let tet=parseFloat(vehicleEmissionCost);
            let tfs=parseFloat(serviceCost);
            let carWash=parseFloat(carWashCost);
    
            tet=tet*n;
            tfs=(parseFloat(td)/5000)*tfs;
            let tcw=((12*n)-(parseFloat(td)/5000))*carWash;

            let tsc=tet+tfs+tcw;
            totalMonthlyCost = totalMonthlyCost + (tfs/(12.0*n)) + carWash;

            // Other Cost Inputs
            const supplementaryCost = document.getElementById("supplementaryCost").value;
            const lease = document.getElementById("lease").value;
            const leaseRate = document.getElementById("leaseRate").value;

            // other cost calcs
            let sc=parseFloat(supplementaryCost);
            let a=parseFloat(lease);
            let r=parseFloat(leaseRate);

            sc=price*sc/100;
            sc=sc*0.25*n;
            let lr=a*r/100;
            let ls=0.00;
            ls=ls+(a/(12*n));
            ls = ls + (lr*(1.0/(12*n)));

            let totherc=sc+lr+a;
            totalMonthlyCost = totalMonthlyCost + ls + (sc/3.0);

            //calculating the vehicle depreciation
            let cd = parseFloat(price);
            let d = [15,10,10,5,5,3,3,2,2,1];

            //get the section to update
            let depsec = document.getElementById("depreciation");
            depsec.innerHTML =  "<p><b>Vehicle Depreciation over the years: </b></p><ul>";
            for (i=0; i<n; i++){
                cd=cd-(cd*d[i]/100);
                depsec.innerHTML += `<li>Depreciation for year ${i+1} : Rs. ${cd.toFixed(2)}</li>`;
            }
            depsec.innerHTML += `</ul><p><b> Final depreciated value of vehicle: Rs. ${cd.toFixed(2)}</b></p>`; 
            //${cd.toFixed(2)} this is to make 2 decimal places are printed, to use it instead of "" use ``

            // Display the results in the "results" section
            let res = document.getElementById("results");
            let sum = tmc + toc + tsc + totherc;
            let totalMonthlyCost2 = totalMonthlyCost - ls;
            res.innerHTML = `
                <p><b>Final cost: </b></p>
                <ul>
                    <li>Total Cost for vehicle for ${n} years: Rs. ${sum.toFixed(2)}</li>
                    <li>Lease settlement for 1 month: Rs. ${ls.toFixed(2)}</li>
                    <li>Monthly cost for vehicle: Rs. ${totalMonthlyCost.toFixed(2)}</li>
                    <li>Monthly cost for vehicle without lease settlement: Rs. ${totalMonthlyCost2.toFixed(2)}</li>
                    <li>Car value left after ${n} years: Rs. ${cd.toFixed(2)}</li>
                </ul>
                <p><b>Thank you for using our service!</b></p>
                `;

            // Log all collected values (for debugging or further processing)
            /*console.log({
                carName,
                carYear,
                carTransmission,
                carGas,
                carPrice,
                carYrUse,
                carTDmonth,
                tyreChangeCost,
                brakePadLinerCost,
                transmissionFluidCost,
                coolantReplaceCost,
                batteryReplacementCost,
                fuelCost,
                fuelEfficiency,
                carCostByInsurance,
                insuranceCost,
                vehicleEmissionCost,
                serviceCost,
                carWashCost,
                supplementaryCost,
                lease,
                leaseRate
            });*/
    
            // Optionally, display the collected data in the "results" section
            /*const resultsSection = document.getElementById("results");
            resultsSection.innerHTML = `
                <h3>Collected Data:</h3>
                <pre>${JSON.stringify({
                    carName,
                    carYear,
                    carTransmission,
                    carGas,
                    carPrice,
                    carYrUse,
                    carTDmonth,
                    tyreChangeCost,
                    brakePadLinerCost,
                    transmissionFluidCost,
                    coolantReplaceCost,
                    batteryReplacementCost,
                    fuelCost,
                    fuelEfficiency,
                    carCostByInsurance,
                    insuranceCost,
                    vehicleEmissionCost,
                    serviceCost,
                    carWashCost,
                    supplementaryCost,
                    lease,
                    leaseRate
                }, null, 2)}</pre>
            `;*/
        }
    
        // Attach the function to the submit button of all forms
        document.getElementById("calc").addEventListener("click", collectInputs);