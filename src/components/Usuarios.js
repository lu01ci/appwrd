import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { mostrarAlerta } from '../functions';

const Usuarios = () => {

// insertar API REST :))))
const url='http://api-usuarios.run/index.php';
    const[usuarios,setUsuarios] = useState([]);
    const[id,setId] = useState('');
    const[nombre,setNombre] = useState('');
    const[carnet,setCarnet] = useState('');
    const[accion,setAccion] = useState(1);
    const[titulo,setTitulo] = useState();

    useEffect( ()=>{
      getUsuarios();
    },[]);

    const getUsuarios = async ()=>{
      const respuesta = await axios.get(url);
      setUsuarios(respuesta.data);
    }

    const openModal = (ac,id, nombre, carnet) =>{
        setId('');
        setNombre('');
        setCarnet('');
        setAccion(ac);
        if(ac === 1){
            setTitulo('Registrar Usuario');
        }
        else if(ac === 2){
            setTitulo('Editar Usuario');
            setId(id);
            setNombre(nombre);
            setCarnet(carnet);
        }
        window.setTimeout(function(){
            document.getElementById('nombre').focus();
        },500);
    }
    const validar = () => {
        var parametros;
        var metodo;
        if(nombre.trim() === ''){
            mostrarAlerta('Escribe el nombre del usuario','warning');
        }
        else if(carnet.trim() === ''){
            mostrarAlerta('Escribe el carnet del usuario','warning');
        }
        else{
            if(accion === 1){
                parametros= {nombre:nombre.trim(),carnet: carnet.trim()};
                metodo= 'POST';
            }
            else{
                parametros={id:id,nombre:nombre.trim(),carnet: carnet.trim()};
                metodo= 'PUT';
            }
            envarSolicitud(metodo,parametros);
        }
    }
    const envarSolicitud = async(metodo,parametros) => {
        await axios({ method:metodo, url: url, data:parametros}).then(function(respuesta){
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            mostrarAlerta(msj,tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
                getUsuarios();
            }
        })
        .catch(function(error){
            mostrarAlerta('Error en la solicitud','error');
            console.log(error);
        });
    }
    const deleteUsuario= (id,nombre) =>{
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            titulo:'¿Seguro de eliminar el usuario '+nombre+' ?',
            icon: 'question',text:'No se podrá dar marcha atrás',
            showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
        }).then((result) =>{
            if(result.isConfirmed){
                setId(id);
                envarSolicitud('DELETE',{id:id});
            }
            else{
                mostrarAlerta('El usuario NO fue eliminado','info');
            }
        });
    }

  return (
    <div className='App'>
        <div className='container-fluid'>
            <div className='row mt-3'>
                <div className='col-md-4 offset-md-4'>
                    <div className='d-grid mx-auto'>
                        <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                            <i className='fa-solid fa-circle-plus'></i> Añadir
                        </button>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr><th>ID</th><th>NOMBRE</th><th>CARNET</th><th></th></tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {usuarios.map( (usuario,i)=>(
                                    <tr key={usuario.id}>
                                        <td>{(i+1)}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.carnet}</td>
                                        <td>
                                            <button onClick={() => openModal(2,usuario.id,usuario.nombre,usuario.carnet)}
                                                 className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                                                <i className='fa-solid fa-edit'></i>
                                            </button>
                                            &nbsp; 
                                            <button onClick={()=>deleteUsuario(usuario.id,usuario.nombre)} className='btn btn-danger'>
                                                <i className='fa-solid fa-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id='modalUsuarios' className='modal fade' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{titulo}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type='hidden' id='id'></input>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                            <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={nombre}
                            onChange={(e)=> setNombre(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='carnet' className='form-control' placeholder='Carnet' value={carnet}
                            onChange={(e)=> setCarnet(e.target.value)}></input>
                        </div>
                        <div className='d-grid col-6 mx-auto'>
                            <button onClick={() => validar()} className='btn btn-success'>
                                <i className='fa-solid fa-floppy-disk'></i> Guardar
                            </button>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Usuarios