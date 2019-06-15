<template class="mt-5">
    <div class="mt-5" style="margin-top: -25px">
        <mdb-container class="free-bird mt-5">
            <mdb-col md="6" class="mx-auto">
                <mdb-jumbotron class="pt-4">
                    <mdb-card>
                        <mdb-card-body>
                            <form>
                                <p class="h4 text-center mb-4">Sign in</p>
                                <div class="grey-text">
                                <mdb-input label="Correo" icon="envelope" type="email"/>
                                <mdb-input label="Contraseña" icon="lock" type="password"/>
                                </div>
                                <div class="text-center">
                                <mdb-btn color="primary">Login</mdb-btn>
                                </div>
                            </form>
                        </mdb-card-body>
                    </mdb-card>
                </mdb-jumbotron>
            </mdb-col>
        </mdb-container>
    </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbInput, mdbTextarea, mdbBtn, mdbIcon, mdbCard, mdbCardBody, mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter } from 'mdbvue';

export default {
  name: 'FormsPage',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbInput,
    mdbTextarea,
    mdbBtn,
    mdbIcon,
    mdbCard,
    mdbCardBody,
    mdbModal,
    mdbModalHeader,
    mdbModalBody,
    mdbModalFooter
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<style scoped>
</style>
