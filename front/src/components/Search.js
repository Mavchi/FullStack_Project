//import 'materialize-css';
import { Row, Col } from 'react-materialize';
import searchIcon from '../img/icons/search-icon.svg'
import './Search.css'

const Search = ({ handleChange }) => {
    return (
            <Row>
                <Col className='search-box ' s={9}>
                    <img src={searchIcon} alt='search'/>
                    <input className='search-input' onChange={handleChange} type='text' value='Search' />
                </Col>
                <Col s={3} style={{ color: 'white' }}>
                    <div className='valign-wrapper center-align'>
                        Filter
                    </div>
            </Col>
            </Row>
    )
}

export default Search