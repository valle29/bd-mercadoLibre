<template class="mt-5">
    <div class="mt-5" style="margin-top: -25px">
        <mdb-container class="free-bird mt-5">
            <mdb-col md="5" class="mx-auto">
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
            </mdb-col>
        </mdb-container>
    </div>
</template>

<script>
import { mdbContainer, mdbCol, mdbInput, mdbBtn, mdbIcon, mdbCard, mdbCardBody} from 'mdbvue';

export default {
  name: 'FormsPage',
  components: {
    mdbContainer,
    mdbCol,
    mdbInput,
    mdbBtn,
    mdbIcon,
    mdbCard,
    mdbCardBody
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
