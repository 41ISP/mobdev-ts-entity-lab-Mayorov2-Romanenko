import { useEffect } from "react"
import { ProcessorCard } from "./components/ProcessorCard"
import { ProcessorForm } from "./components/ProcessorForm"
import { useProcessorsStore } from "./useProcessorsStore"
import "./App.css"

export default function App() {
    const { processors, loading, error, deleteProcessor } = useProcessorsStore()

    useEffect(() => {
        void useProcessorsStore.getState().loadProcessors()
    }, [])

    return (
        <div className="layout">
            <header className="top">
                <h1>Мои процессоры</h1>
                <span className="pill">{processors.length}</span>
            </header>

            <aside>
                <ProcessorForm />
            </aside>

            <main>
                {loading ? (
                    <p className="hint">Загрузка…</p>
                ) : error ? (
                    <p className="error">Ошибка: {error}</p>
                ) : processors.length === 0 ? (
                    <p className="hint">Добавьте процессор</p>
                ) : (
                    <div className="grid">
                        {processors.map((processor) => (
                            <ProcessorCard
                                key={processor.documentId}
                                {...processor}
                                onDelete={deleteProcessor}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}