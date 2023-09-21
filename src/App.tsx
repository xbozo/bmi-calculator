import { useState } from "react";
import { GridItem } from "./components/Griditem/Griditem";
import { Level, calculateImc, levels } from "./utils/imc";

import styles from "./App.module.css";
import leftArrowImage from "./assets/leftarrow.png";

const App = () => {
    const [heightField, setHeightField] = useState<number>(0);
    const [weightField, setWeightField] = useState<number>(0);
    const [toShow, setToShow] = useState<Level | null>(null);

    const handleCalculateButton = () => {
        if (heightField && weightField) {
            setToShow(calculateImc(heightField, weightField));
        } else {
            alert("Preencha todos os campos.");
        }
    };

    const handleBackButton = () => {
        setToShow(null);
        setHeightField(0);
        setWeightField(0);
    };

    return (
        <div className={styles.body}>
            <main className={styles.content}>
                <section className={styles.leftSide}>
                    <h1>Calcule o seu IMC.</h1>
                    <p>
                        IMC é a sigla para Índice de Massa Corpórea, parâmetro
                        adotado pela Organização Mundial de Saúde para calcular
                        o peso ideal de cada pessoa.
                    </p>
                    <input
                        type="number"
                        placeholder="Digite a sua altura. Ex: 1.5 (em metros)"
                        value={heightField > 0 ? heightField : ""} // quando for 0 não aparece no input sobrescrevendo o placeholder
                        onChange={(e) =>
                            setHeightField(parseFloat(e.target.value))
                        } // o input só aceita números portanto o parsefloat o converte e depois pega seu valor (pega as infos)
                        disabled={toShow ? true : false}
                    />
                    <input
                        type="number"
                        placeholder="Digite o seu peso. Ex: 75.3 (em kg)"
                        value={weightField > 0 ? weightField : ""}
                        onChange={(e) =>
                            setWeightField(parseFloat(e.target.value))
                        }
                        disabled={toShow ? true : false}
                    />
                    <button
                        onClick={handleCalculateButton}
                        disabled={toShow ? true : false}
                    >
                        Calcular
                    </button>
                </section>

                <section className={styles.rightSide}>
                    {!toShow && (
                        <div className={styles.grid}>
                            {levels.map((item, key) => (
                                <GridItem key={key} item={item} /> // exibe as 4 variantes
                            ))}
                        </div>
                    )}
                    {toShow && (
                        <div className={styles.rightBig}>
                            <div
                                className={styles.rightArrow}
                                onClick={handleBackButton}
                            >
                                <img src={leftArrowImage} alt="" width={25} />
                            </div>
                            <GridItem item={toShow} />
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default App;
