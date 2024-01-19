import fs from "fs/promises";



async function transformData() {
    try {
        let data = await fs.readFile('hellocheck.json');
        let endResult = []
        data = JSON.parse(data);
        let newData = data.map((ele) => {
            return {
                localityName: ele.localityName,
                ['price-trends']: ele['price-trends']['1']
            }
        })
        newData.forEach((ele) => {
            let result = [];
            for (let year in ele['price-trends']) {
                let quarters = ele['price-trends'][year];
                for (let i = 0; i < quarters.length; i++) {
                    if (quarters[i].yVal !== undefined) {
                        result.push({
                            localityName: ele.localityName,
                            pricePerSft: quarters[i].xVal,
                            date: quarters[i].yVal
                        });
                    }
                }
            }
            endResult.push(result);
        })
        await fs.writeFile('modified.json', JSON.stringify(endResult));
    } catch (error) {
        console.error(error)
    }
}

transformData();