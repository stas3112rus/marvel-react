import { useState, } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import './charSearch.scss'

const CharSearch = () =>{

    const [request, setRequest] = useState('');
    const [isSend, setIsSend] = useState(false);
    const [charachter, setCharachter] = useState(false);

    const {getCharacterId} = useMarvelService ();

    const typeValue = (value) =>{
        setRequest(value);
        setIsSend(false);
        setCharachter(false);
    }

    const notFound = (isSend && !charachter) ? <NotFound/> : null;
    const transition = (isSend && charachter) ? 
            <TransitionToCharacterPage name={charachter.name} id={charachter.id}/> : null;
              
    return(
        <>
            <Formik
            initialValues = {
            {
                characterName: '',
            }}
            validate={()=>{
               const errors = {};
               if (!request){
                   errors.characterName = 'This field is required'
               }
               return errors; 
            }}

            onSubmit = { async() => {
                
                await getCharacterId(request).then(data=>setCharachter(data));
                setIsSend(true);
            }}
            >
                <div className='char__search'>
                    <div className="char__title-search">
                        Or find a character by name:
                    </div>            
                        <Form action="">
                            <div className="char__search-wrapper">
                                <Field 
                                    type="text" 
                                    name='characterName'
                                    className='char__search-input'
                                    placeholder="Enter name"
                                    value={request}
                                    onChange={e=>typeValue(e.target.value)}
                                    />
                                <button type='submit' className="button button__main">
                                    <div className="inner">Find</div>
                                </button>
                            </div>
                            {transition} 
                            {notFound}
                            <ErrorMessage className='char__error' name='characterName' component={'div'}/>
                        </Form>
                </div>
            </Formik>           
        </>
            
    )
}



const TransitionToCharacterPage = (props) =>{
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return(
        <div className="char__search-wrapper">
            <div className="char__title-search char__title-search-green">
                There is! Visit {capitalizeFirstLetter(props.name)} page?
            </div>
            
            <Link to={`/charachter/${props.id}`}>
                <div className="button button__secondary">
                    <div className="inner">TO PAGE</div>
                </div>
            </Link>                        
        </div>
    )
}

const NotFound = () =>{
    return(
        <div className="char__error">
            The character was not found. Check the name and try again
        </div>
    )
}

export default CharSearch