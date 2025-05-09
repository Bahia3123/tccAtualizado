<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CuraPé - Histórico de Consultas</title>
    <link rel="stylesheet" href="../css/acessoPaciente.css">
</head>
<body>
    <header>
        <div class="container header-content">
            <div class="logo">
                <img src="../img/Logo CuraPé.png" alt="logo">
                <h1>CuraPé</h1>
            </div>
            <div class="user-menu">
                <div class="user-info">
                    <div class="user-name">João Pedro</div>
                </div>
                <div class="user-avatar">JP</div>
            </div>
        </div>
    </header>

    <div class="container">
        <div class="dashboard">
            <aside class="sidebar">
    
                <nav>
                     <div class="nav-item active">
                         <svg class="icon" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                                    </svg>
                                    <span> Home </span>
                                </div>
                                
                                <div class="nav-item">
                                    <svg class="icon" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clip-rule="evenodd"/>
                                    </svg>
                                    <span>Histórico</span>
                                </div>
                                <div class="nav-item">
                                    <svg class="icon" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                                    </svg>
                                    <span>Pacientes</span>
                                </div>                   
                            </nav>
            </aside>

            <main class="main-content">
                <div class="welcome-banner">
                    <h2>Bem-vindo, João Pedro!</h2>
                    <p>Acesse seu histórico médico completo e acompanhe todas as suas consultas em um só lugar.</p>
                </div>

                <div class="actions-grid">
                    <div class="action-card">
                        <svg class="icon" viewBox="0 0 24 24" style="width: 48px; height: 48px;">
                            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 18H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h1v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5h1c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1z"/>
                        </svg>
                        <h3>Agendar Consulta</h3>
                        <p>Marque uma nova consulta com nossos especialistas</p>
                    </div>
                    <div class="action-card" id="viewHistoryBtn">
                        <svg class="icon" viewBox="0 0 24 24" style="width: 48px; height: 48px;">
                            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                        <h3>Histórico de Consultas</h3>
                        <p>Visualize todas as suas consultas anteriores</p>
                    </div>
                    <div class="action-card">
                        <svg class="icon" viewBox="0 0 24 24" style="width: 48px; height: 48px;">
                            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                        </svg>
                        <h3>Exames</h3>
                        <p>Acesse seus exames e resultados</p>
                    </div>
                </div>

               
            </main>
        </div>
    </div>

    <script>
        // Simulação de ação ao clicar no botão de histórico
        document.getElementById('mainHistoryBtn').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Redirecionando para o histórico completo de consultas...');
            // Na implementação real, aqui seria window.location.href = 'historico.html';
        });

        document.getElementById('viewHistoryBtn').addEventListener('click', function() {
            alert('Redirecionando para o histórico de consultas...');
            // Na implementação real, aqui seria window.location.href = 'historico.html';
        });
    </script>
</body>
</html>