import { useState, type FormEvent } from "react"
import { getErrorMessage } from "../api"
import { TYPE, TYPE_LABELS, type ProcessorType } from "../types"
import { useProcessorsStore } from "../useProcessorsStore"

export function ProcessorForm() {
    const createProcessor = useProcessorsStore((state) => state.createProcessor)
    const [name, setName] = useState("")
    const [type, setType] = useState<ProcessorType>(TYPE[0])
    const [price, setPrice] = useState(0)
    const [instock, setInstock] = useState(false)
    const [power, setPower] = useState(0)
    const [releseaseDate, setReleseaseDate] = useState(
        () => new Date().toLocaleDateString("sv-SE"),
    )
    const [rating, setRating] = useState(0)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)

        if (!Number.isInteger(power)) {
            setError("Мощность должна быть целым числом")
            return
        }

        setSaving(true)
        try {
            await createProcessor({ name, type, price, instock, power, releseaseDate, rating })
            setName("")
            setType(TYPE[0])
            setPrice(0)
            setInstock(false)
            setPower(0)
            setReleseaseDate(new Date().toLocaleDateString("sv-SE"))
            setRating(0)
        } catch (error) {
            setError(getErrorMessage(error))
        } finally {
            setSaving(false)
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Добавить процессор</h2>

            <label className="field">
                Название
                <input type="text" required value={name}
                    onChange={(e) => setName(e.target.value)} />
            </label>

            <label className="field">
                Тип
                <select value={type} onChange={(e) => setType(e.target.value as ProcessorType)}>
                    {TYPE.map((value) => (
                        <option key={value} value={value}>{TYPE_LABELS[value]}</option>
                    ))}
                </select>
            </label>

            <label className="field">
                Цена
                <input type="number" min={0} step={0.01} value={price}
                    onChange={(e) => setPrice(Number(e.target.value))} />
            </label>

            <label className="field">
                Мощность, Вт
                <input type="number" min={0} step={1} value={power}
                    onChange={(e) => setPower(Number(e.target.value))} />
            </label>

            <label className="field">
                Дата выхода
                <input type="date" required value={releseaseDate}
                    onChange={(e) => setReleseaseDate(e.target.value)} />
            </label>

            <label className="field">
                <span>Оценка: {rating}</span>
                <input type="range" min={0} max={10} step={0.5} value={rating}
                    onChange={(e) => setRating(Number(e.target.value))} />
            </label>

            <label className="check">
                <input type="checkbox" checked={instock}
                    onChange={(e) => setInstock(e.target.checked)} />
                В наличии
            </label>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="btn" disabled={saving}>
                {saving ? "Сохраняем…" : "Добавить"}
            </button>
        </form>
    )
}