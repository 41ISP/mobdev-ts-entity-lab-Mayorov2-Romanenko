import { API_URL } from "../api"
import { TYPE_LABELS, type IProcessor } from "../types"

interface IProcessorCard extends IProcessor {
    onDelete: (documentId: string) => Promise<void>
}

export function ProcessorCard({
    documentId, name, type, price, instock, power, releseaseDate, rating, image, onDelete,
}: IProcessorCard) {
    return (
        <article className="card">
            <div className="card__cover">
                {image ? (
                    <img
                        src={new URL(image.url, API_URL).href}
                        alt={image.alternativeText ?? name}
                    />
                ) : (
                    <span>{name.charAt(0)}</span>
                )}
                {rating != null && <b className="card__badge">{rating}</b>}
            </div>

            <div className="card__body">
                <h3>{name}</h3>
                <p className="card__meta">Тип: {TYPE_LABELS[type]}</p>
                {power != null && <p className="card__meta">Мощность: {power} Вт</p>}
                {releseaseDate && (
                    <p className="card__meta">
                        Дата выхода: {new Date(releseaseDate).toLocaleDateString("ru-RU", {
                            timeZone: "UTC",
                        })}
                    </p>
                )}
                <p className="card__meta">В наличии: {instock ? "да" : "нет"}</p>
            </div>

            <footer className="card__footer">
                <strong>{price != null ? price.toFixed(2) : "Цена не указана"}</strong>
                <button
                    type="button"
                    className="link-btn"
                    onClick={() => void onDelete(documentId)}
                >
                    Удалить
                </button>
            </footer>
        </article>
    )
}