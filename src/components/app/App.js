import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom' 

import AppHeader from '../appHeader/AppHeader'
import Spinner from '../spinner/Spinner';

const Page404 = lazy(()=> import('../pages/Page404')); // Динамический импорт, идет после статитики
const MainPage = lazy(()=> import('../pages/MainPage'));
const ComicsPage = lazy(()=> import('../pages/ComicsPage'));
const SingleComicsPage = lazy(()=> import('../pages/SingleComicsPage'));

const App = () => {

    return (
        <Router>
        <div className="app">
            <AppHeader/>
            <main>               
                <Suspense fallback={<Spinner/>}>  {/* Динамический импорт */}
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>  
                        <Route path="/comics" element={<ComicsPage/>} />
                        <Route path="/comics/:comicId" element={<SingleComicsPage/>} />
                        <Route path='*' element={<Page404/>}/>
                    </Routes>
                </Suspense>
            </main>
        </div>
        </Router>
    )
}

export default App;