import styles from "./app.module.css";
import data from "./data.json";
import { useState } from "react";

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const buttonClickBack = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		}
	};
	const buttonClickForward = () => {
		if (activeIndex < 6) {
			setActiveIndex(activeIndex + 1);
		}
	};
	const buttonClickAllFirst = () => {
		setActiveIndex(0);
	};
	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	let isFirstStep = true;
	let isLastStep = false;

	if (activeIndex === 0) {
		isFirstStep = true;
	} else if (activeIndex === 6) {
		isFirstStep = false;
		isLastStep = true;
	} else {
		isFirstStep = false;
	}
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles["steps-content"]}>
						{steps.map((item, index) => {
							return (
								index === activeIndex && (
									<p key={item.id}>{item.content}</p>
								)
							);
						})}
					</div>
					<ul className={styles["steps-list"]}>
						{steps.map((item, index) => {
							return (
								<li
									className={
										styles["steps-item"] +
										(activeIndex === index
											? " " + styles.active
											: activeIndex > index
											? " " + styles.done
											: "")
									}
									key={item.id}
								>
									<button
										className={styles["steps-item-button"]}
										onClick={() => setActiveIndex(index)}
									>
										{parseInt(item.id)}
									</button>
									{item.title}
								</li>
							);
						})}
					</ul>
					<div className={styles["buttons-container"]}>
						<button
							className={styles.button}
							onClick={buttonClickBack}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={buttonClickForward}
							disabled={isLastStep}
						>
							Далее
						</button>
						{isLastStep && (
							<button
								className={styles.button}
								onClick={buttonClickAllFirst}
							>
								Начать сначала
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
