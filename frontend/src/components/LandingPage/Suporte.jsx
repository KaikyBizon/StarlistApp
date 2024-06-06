import './Suporte.css'
function Suporte(){
    return(
        <>
           <section id="suporte">



<div className="Suporte">

    <div className="reclamaçoes">
        <h1 id="titulo_suporte">Suporte</h1>
        <form action="#">
            <input type="email" name="email" className="btn-todos e-mail" placeholder="Digite seu e-mail"/>
            <textarea name="mensagem" className="btn-todos mensagem" cols="30" rows="5"
                placeholder="Digite seu problema"></textarea>
            <input type="submit" value="Enviar" className="btn-todos botão"
                href="file:///C:/Users/Aluno/Documents/GitHub/ProgramadoresdaFiel/cadastro.html"/>
        </form>
    </div>




</div>
</section>

        </>
    )
}

export { Suporte };
