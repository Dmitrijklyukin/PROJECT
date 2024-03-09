import styles from "./styles/App.module.css";
import { useState } from "react";

export const App = () => {
	const [value, setValue] = useState("");
	const [list, setList] = useState([]);
	const [error, setError] = useState("");
	const [isValueVaild, setIsValueVaild] = useState(true);

	const onInputButtonClick = () => {
		const promptValue = prompt("Введите значение:");

		if (promptValue.length >= 3) {
			setValue(promptValue);
			setError("");
			setIsValueVaild(true);
		} else {
			setError("Введенное значение должно содержать минимум 3 символа");
			if (value.lengt < 3) {
				setIsValueVaild(false);
			}
		}
	};

	const onAddButtonClick = () => {
		if (isValueVaild) {
			setList([...list, { id: Date.now(), value: value }]);
			setError("");
			setValue("");
			setIsValueVaild(false);
		}
	};

	return (
		<div>
			<div className={styles["app"]}>
				<h1 className={styles["page-heading"]}>Ввод значения</h1>
				<p className={styles["no-margin-text"]}>
					Текущее значение <code>value</code>: "
					<output className={styles["current-value"]}>{value}</output>
					"
				</p>
				{error !== "" && <div className={styles["error"]}>{error}</div>}
				<div className={styles["buttons-container"]}>
					<button
						className={styles["button"]}
						onClick={onInputButtonClick}
					>
						Ввести новое
					</button>
					<button
						className={styles["button"]}
						disabled={!isValueVaild}
						onClick={onAddButtonClick}
					>
						Добавить в список
					</button>
				</div>
				<div className={styles["list-container"]}>
					<h2 className={styles["list-heading"]}>Список:</h2>
					{list.length ? (
						<ul className={styles["list"]}>
							{list.map((item) => (
								<li
									className={styles["list-item"]}
									key={item.id}
								>
									{item.value}
								</li>
							))}
						</ul>
					) : (
						<p className={styles["no-margin-text"]}>
							Нет добавленных элементов
						</p>
					)}
				</div>
			</div>
		</div>
	);
};
